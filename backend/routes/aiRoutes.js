const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require("../models/Product");

// Secure all AI routes
router.use(authMiddleware);

// Initialize Gemini AI Client
const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
let genAI = null;
if (apiKey && apiKey.startsWith("AIzaSy")) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.error("Failed to initialize GoogleGenerativeAI client:", err);
  }
} else {
  console.log("No valid Gemini API key found. Falling back to rule-based generation.");
}

// ENDPOINT: Generate Product Content (Description, Tags, Slogans)
router.post("/generate-description", async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "Title and Category are required" });
    }

    let description = "";
    let tags = [];
    let marketingCaption = "";

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are a high-end e-commerce copywriter. Generate content for a product.
Product Title: "${title}"
Product Category: "${category}"

Provide your response in JSON format. Return ONLY the JSON object, containing exactly these keys:
{
  "description": "A professional, enticing 2-3 sentence product description highlighting modern design and usability.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "marketingCaption": "A short, punchy marketing caption or slogan to drive sales."
}
Return only the raw JSON. Do not include markdown code block syntax (like \`\`\`json) or additional text.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        
        // Clean markdown backticks if any
        let cleanText = text;
        if (cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        }

        const data = JSON.parse(cleanText);
        description = data.description || "";
        tags = Array.isArray(data.tags) ? data.tags : [];
        marketingCaption = data.marketingCaption || "";
      } catch (geminiError) {
        console.error("Gemini call failed, using fallback:", geminiError);
        // Fallback rule-based generation
        description = `The new ${title} is a premium addition to our ${category} collection, engineered with advanced technology and sleek ergonomics to simplify your life.`;
        tags = [title.toLowerCase(), category.toLowerCase(), `buy-${category.toLowerCase()}`, "premium-quality", "modern-lifestyle"];
        marketingCaption = `Elevate your standard with the ${title} — designed for tomorrow, available today.`;
      }
    } else {
      // Fallback rule-based generation
      description = `The new ${title} is a premium addition to our ${category} collection, engineered with advanced technology and sleek ergonomics to simplify your life.`;
      tags = [title.toLowerCase(), category.toLowerCase(), `buy-${category.toLowerCase()}`, "premium-quality", "modern-lifestyle"];
      marketingCaption = `Elevate your standard with the ${title} — designed for tomorrow, available today.`;
    }

    res.json({
      result: `📝 Product Description:\n${description}\n\n🏷 SEO Tags:\n${tags.join(", ")}\n\n📢 Marketing Caption:\n${marketingCaption}`,
      description,
      tags,
      marketingCaption
    });

  } catch (error) {
    console.error("AI Generation route error:", error);
    res.status(500).json({ message: "AI generation failed" });
  }
});

// ENDPOINT: Generate Dynamic Catalog Insights
router.get("/insights", async (req, res) => {
  try {
    // Fetch products belonging to the logged-in user
    const products = await Product.find({ userId: req.user.id });

    if (products.length === 0) {
      return res.json({
        summary: {
          insightsCount: 2,
          actionsTaken: 0,
          revenueImpact: "₹0"
        },
        insights: [
          {
            icon: "TagIcon",
            title: "Add Products to Get Started",
            label: "Product Optimisation",
            labelColor: "#6366f1",
            bgColor: "#eef2ff",
            desc: "Add your e-commerce products in the catalog page so the AI engine can analyze inventory, pricing, and tags to provide optimization ideas.",
            priority: "Medium",
            priorityColor: "bg-indigo-50 text-indigo-700"
          },
          {
            icon: "TrendIcon",
            title: "SEO Readiness Alert",
            label: "SEO Alert",
            labelColor: "#ec4899",
            bgColor: "#fdf2f8",
            desc: "Make sure to leverage the '✨ Generate with AI' button when adding products to create high-ranking search tags and sales captions.",
            priority: "Low",
            priorityColor: "bg-slate-100 text-slate-600"
          }
        ]
      });
    }

    // Prepare catalog context for Gemini
    const catalogSummary = products.map(p => ({
      title: p.title,
      price: p.price,
      stock: p.stock,
      category: p.category,
      hasDescription: !!p.description,
      hasTags: p.tags && p.tags.length > 0
    }));

    let insightsList = [];
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an AI business analyst for an e-commerce store. Analyze the following store products catalogue:
${JSON.stringify(catalogSummary, null, 2)}

Generate 3 to 4 actionable, highly realistic business recommendations/insights.
Categorize each into one of: "Product Optimisation", "Sales Insight", "Inventory Alert", "Pricing Adjustment", "SEO Alert".
For each insight, determine a priority: "Low", "Medium", "High", "Critical".

Return your response ONLY in JSON format. Do not include markdown code block syntax. Follow this exact JSON array structure:
[
  {
    "icon": "TagIcon" | "TrendIcon" | "AlertIcon" | "UsersIcon",
    "title": "Short title describing the action, e.g., 'Optimize SEO Tags'",
    "label": "One of: Product Optimisation, Sales Insight, Inventory Alert, Pricing Adjustment, SEO Alert",
    "labelColor": "Hex code, e.g. '#6366f1' for indigo, '#10b981' for green, '#f59e0b' for amber, '#ec4899' for pink",
    "bgColor": "Light hex background matching the label color (e.g. '#eef2ff', '#ecfdf5', '#fffbeb', '#fdf2f8')",
    "desc": "A detailed explanation of the insight: what you analyzed in the catalog and exactly what the user should do.",
    "priority": "Low | Medium | High | Critical",
    "priorityColor": "Tailwind badge classes, e.g., 'bg-red-50 text-red-600' for high/critical, 'bg-amber-50 text-amber-600' for medium, 'bg-slate-100 text-slate-600' for low"
  }
]`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        
        let cleanText = text;
        if (cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        }

        insightsList = JSON.parse(cleanText);
      } catch (geminiError) {
        console.error("Gemini insights calculation failed, using fallback:", geminiError);
      }
    }

    // If Gemini fails or isn't set up, compute rule-based insights dynamically based on actual products
    if (insightsList.length === 0) {
      // 1. Check for low stock items
      const lowStockProducts = products.filter(p => p.stock < 10);
      if (lowStockProducts.length > 0) {
        insightsList.push({
          icon: "AlertIcon",
          title: "Low Stock Inventory Warning",
          label: "Inventory Alert",
          labelColor: "#f59e0b",
          bgColor: "#fffbeb",
          desc: `Stock is running low for ${lowStockProducts.slice(0, 2).map(p => p.title).join(", ")}. Consider restock immediately to avoid loss of revenue.`,
          priority: "Critical",
          priorityColor: "bg-red-50 text-red-700"
        });
      }

      // 2. Check for products lacking AI description/tags
      const missingAiContent = products.filter(p => !p.description || p.tags.length === 0);
      if (missingAiContent.length > 0) {
        insightsList.push({
          icon: "TagIcon",
          title: "Optimize Search Visibility",
          label: "Product Optimisation",
          labelColor: "#6366f1",
          bgColor: "#eef2ff",
          desc: `There are ${missingAiContent.length} products lacking structured descriptions or tags (such as ${missingAiContent[0].title}). Adding AI content could lift views by 24%.`,
          priority: "High",
          priorityColor: "bg-red-50 text-red-600"
        });
      }

      // 3. Price-based optimization
      const highValueProduct = products.reduce((prev, current) => (prev.price > current.price) ? prev : current);
      if (highValueProduct) {
        insightsList.push({
          icon: "TrendIcon",
          title: `Smart Pricing: ${highValueProduct.title}`,
          label: "Pricing Adjustment",
          labelColor: "#10b981",
          bgColor: "#ecfdf5",
          desc: `${highValueProduct.title} is listed at ₹${highValueProduct.price}. Run a 10% coupon or bundle it with low-cost accessories to speed up stock turnover.`,
          priority: "Medium",
          priorityColor: "bg-amber-50 text-amber-600"
        });
      }
    }

    // Dynamic stats summary based on products count
    const totalInventoryVal = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const estImpact = Math.round(totalInventoryVal * 0.15); // Simulated 15% revenue increase from suggestions

    res.json({
      summary: {
        insightsCount: insightsList.length,
        actionsTaken: Math.round(insightsList.length * 0.4),
        revenueImpact: `₹${(estImpact / 1000).toFixed(1)}k`
      },
      insights: insightsList
    });

  } catch (error) {
    console.error("AI Insights route error:", error);
    res.status(500).json({ message: "Server error generating insights" });
  }
});

module.exports = router;