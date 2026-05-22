import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import Navbar from "../components/Navbar";

import API from "../services/api";

function AIInsights() {

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generateAI = async () => {

    try {

      setLoading(true);

      const response =
        await API.post(
          "/ai/generate-description",
          {
            title,
            category,
          }
        );

      setResult(
        response.data.result
      );

    } catch (error) {

      console.log(error);

      alert(
        "AI generation failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <MainLayout>

      <Navbar />

      <main className="p-10">

        <div className="mb-10">

          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            AI Commerce Intelligence
          </h2>

          <p className="text-slate-500">
            Generate AI-powered product content and business insights
          </p>

        </div>

        <div className="grid grid-cols-12 gap-8">

          <div className="col-span-5 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              AI Product Generator
            </h3>

            <div className="space-y-5">

              <div>

                <label className="block mb-2 text-sm font-medium text-slate-600">
                  Product Name
                </label>

                <input
                  type="text"
                  placeholder="Wireless Headphones"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />

              </div>

              <div>

                <label className="block mb-2 text-sm font-medium text-slate-600">
                  Category
                </label>

                <input
                  type="text"
                  placeholder="Electronics"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                />

              </div>

              <button
                onClick={generateAI}
                className="w-full bg-indigo-700 hover:bg-indigo-800 transition text-white py-4 rounded-xl font-semibold shadow-lg"
              >

                {loading
                  ? "Generating AI..."
                  : "Generate AI Content"}

              </button>

            </div>

            <div className="mt-10 bg-gradient-to-r from-indigo-700 to-violet-600 rounded-2xl p-6 text-white">

              <h4 className="text-xl font-bold mb-3">
                Smart AI Features
              </h4>

              <ul className="space-y-2 text-indigo-100 text-sm">

                <li>
                  • Product Description Generation
                </li>

                <li>
                  • SEO Tag Optimization
                </li>

                <li>
                  • Marketing Caption Suggestions
                </li>

                <li>
                  • AI Sales Recommendations
                </li>

              </ul>

            </div>

          </div>

          <div className="col-span-7 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

            <div className="flex justify-between items-center mb-6">

              <div>

                <h3 className="text-2xl font-bold text-slate-800">
                  AI Generated Output
                </h3>

                <p className="text-slate-500 mt-1">
                  Real-time AI generated ecommerce content
                </p>

              </div>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                AI Active
              </div>

            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[500px] whitespace-pre-wrap leading-8 text-slate-700">

              {result ? (
                result
              ) : (

                <div className="h-full flex flex-col justify-center items-center text-center">

                  <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-4xl mb-6">
                    🤖
                  </div>

                  <h3 className="text-2xl font-bold text-slate-700 mb-2">
                    AI Content Engine Ready
                  </h3>

                  <p className="text-slate-500 max-w-md">
                    Enter product details and let SmartStore AI generate optimized ecommerce content instantly.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </main>

    </MainLayout>

  );
}

export default AIInsights;