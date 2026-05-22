import { useState } from "react";

import MainLayout from
  "../layouts/MainLayout";

import Navbar from
  "../components/Navbar";

import API from
  "../services/api";

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

      alert("AI generation failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <MainLayout>

      <Navbar />

      <div className="bg-white p-8 rounded-3xl shadow-sm">

        <h2 className="text-3xl font-bold mb-6">
          AI Product Generator
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Product Name"
            className="border p-4 rounded-2xl"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-4 rounded-2xl"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <button
            onClick={generateAI}
            className="bg-blue-500 text-white p-4 rounded-2xl"
          >

            {loading
              ? "Generating..."
              : "Generate AI Content"}

          </button>

          {result && (

            <div className="bg-gray-100 p-6 rounded-2xl mt-4 whitespace-pre-wrap">

              {result}

            </div>

          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default AIInsights;