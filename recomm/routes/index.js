var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/index", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/detail", function (req, res, next) {
  res.render("detail", { title: "Express" });
});

router.get("/top50", function (req, res, next) {
  res.render("top50", { title: "Express" });
});

router.get("/search", function (req, res, next) {
  res.render("search", { title: "Express" });
});

router.get("/type", function (req, res, next) {
  res.render("type", { title: "Express" });
});

router.get("/my", function(req, res, next) {
  res.render("my", {title : "Express"});
});

router.get("/survey", function(req, res, next) {
  res.render("survey", {title : "Express"});
});

module.exports = router;
