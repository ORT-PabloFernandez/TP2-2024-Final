import getConnection from "./conn.js";
import { ObjectId } from 'mongodb';

const DATABASE = "sample_supplies";
const MOVIES = "sales";

async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getSalesById(salesId) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(salesId) });
  return sales;
}

async function getSalesByStoreLocation(salesStoreLocation) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ storeLocation: salesStoreLocation })
    .toArray();
  return sales;
}


async function getSalesByFilters(storeLocation, purchaseMethod, couponUsed) {
  const connectiondb = await getConnection();
  const query = {};

  if (storeLocation) {
    query.storeLocation = storeLocation;
  }
  if (purchaseMethod) {
    query.purchaseMethod = purchaseMethod;
  }
  if (couponUsed) {
    query.couponUsed = couponUsed === 'true';
  }

  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(query)
    .toArray();
  return sales;
}

async function getSalesByClientSatisfaction(typeSatisfaction) {
  const connectiondb = await getConnection();

  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ satisfaction: typeSatisfaction })
    .toArray();
  return sales;
}

export { getAllSales, getSalesById, getSalesByStoreLocation, getSalesByFilters, getSalesByClientSatisfaction };
