import express from "express";
import { getAllSales, getSalesById, getSalesByStoreLocation, getSalesByFilters, getSalesByClientSatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/by-id", async (req, res) => {
  const salesId = req.query.salesId;

  res.json(await getSalesById(salesId));
});

router.get("/store-location", async (req, res) => {
  const salesStoreLocation = req.query.storeLocation;

  res.json(await getSalesByStoreLocation(salesStoreLocation));
});

router.get("/filters-sales", async (req, res) => {
  const { storeLocation, purchaseMethod, couponUsed } = req.query;

    res.json(await getSalesByFilters(storeLocation, purchaseMethod, couponUsed));

});

router.get("/client-satisfaction", async (req, res) => {
  const typeSatisfaction = parseInt(req.query.satisfaction, 10);
  

    res.json(await getSalesByClientSatisfaction(typeSatisfaction));

});

export default router;
