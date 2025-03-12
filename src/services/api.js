import OpenAI from "openai";

// Remove on the frontend and use the backend only to fetch the API
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const processPatientData = async ( patientData, filterOption ) => {
    console.log(patientData,filterOption)
    const prompt = `
    You are an expert in parsing complex medical lab data. You will receive raw text of patient lab results.
    
    🎯 **Your mission:**
    Analyze and organize **ALL** lab results into a structured JSON object with three sections: "CBC", "BMP", and "Others".
    
    ---
    
    📋 **Strict Parsing & Organizational Rules:**
    
    1. **Parse ALL lab data** and organize them into a JSON object as described below. **Never skip any data line**.
    2. Return **3 sections** — "CBC", "BMP", and "Others" — each with **headers** and **rows** as shown below.
    3. If data for a specific value is **missing or shown as "-" or "N/A" or "Neg" or "Pos" or similar**, replace it with **null** — this makes the JSON valid.
    4. If a row has **incomplete columns**, leave the missing columns as **null** but **do NOT skip the row**.
    5. Any lab test that **does NOT belong to CBC or BMP** (examples: Albumin, T. Bili, Alk Phos, Protein, AST, ALT, PreAlbumin, Hep b s ag, Hep b s ab, Hep b c ab, Hep c ab, Procalcitonin, Vancomycin, TSH, BNP, HbA1c, etc.) must go into "Others". Use columns: **"Section" and "Details"**.
    6. If multiple dates and results appear on one line, **combine them together**, separated clearly like this: \`"03/04/25: 0.12, 01/03/25: Neg"\`.
    7. **Do NOT omit old data unless a filter is provided.** Always show all available data unless filters like "Last Month", "Last 3 Months", "Last 3 Weeks" are specified.
    
    ---
    
    📅 **Data Handling & Filtering Rules:**
    
    8. **Chronological**: Sort all rows in each section from **most recent to oldest** using the date column.
    9. **Last Month**: Only include data entries from **the last month** (based on the latest date found in the dataset).
    10. **Last 3 Months**: Only include data entries from **the last 3 months** (based on the latest date in the dataset).
    11. **Last 3 Weeks**: Only include data entries from **the last 3 weeks** (relative to the most recent date).
    12. **Summarize**: If requested, first write a **plain-language summary** of key trends and notable lab values, followed by a **human-readable** formatted version of the full data.
    13. Dates may be formatted as MM/DD/YY or MM/DD/YYYY — handle both.
    
    ---
    
    💡 **Error Handling and Edge Cases:**
    
    14. If a numeric value is missing or shown as invalid (e.g., "-", "N/A", "Neg", "Pos", empty), always replace it with **null**.
    15. If non-numeric results are given (e.g., "Negative", "Positive"), store them as **strings** inside the field (if contextually correct, e.g., for antigen/antibody results).
    16. If data appears malformed but can be logically interpreted (e.g., missing column), **attempt to include it** and fill missing slots as **null**.
    17. If value cannot be mapped to a specific known test, place it under "Others" to ensure nothing is lost.
    
    ---
    
    ✅ **JSON Output Format (Required Structure):**
    
    {
      "CBC": {
        "headers": ["Date", "WBC", "Hgb", "Hct", "Plt"],
        "rows": []
      },
      "BMP": {
        "headers": ["Date", "Na", "K", "Cl", "HCO2", "Glucose", "BUN", "Cr", "Ca", "eGFR"],
        "rows": []
      },
      "Others": {
        "headers": ["Section", "Details"],
        "rows": []
      },
      "Summary": "Optional. Include only if user asks for 'Summarize'. Write a concise trend analysis and major observations here."
    }
    
    ---
    
    🚨 **Important Instructions:**
    
    - **DO NOT** leave sections empty — if there is no data for a section, use an empty array for "rows".
    - **DO NOT** add explanations, apologies, or extra commentary — only return the pure JSON object as shown above.
    - **DO NOT** skip lines even if they seem incomplete.
    - **ALWAYS** process all data present in the input.
    - Be resilient to odd formatting or mixed date/value entries — parse them carefully and include them appropriately.
    
    ---
    
    Here is the patient lab data to process:
    
    ${patientData}
    
    User filter option (Chronological, Last Month, Last 3 Months, Last 3 Weeks, Summarize, or None): ${filterOption}
    
    Return only the properly formatted JSON object, nothing else.
    `;
    

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        // {   role: "developer",
        //     content: [{
        //     "type": "text",
        //     "text": systemPrompt
        //     }]
        // },
        {   role: "user",
            content: [{
            "type": "text",
            "text": prompt
            }]
        }
    ],
    temperature: 0.7,
    top_p: 1,
    response_format: { "type": "json_object" }
  });
  // Step 1: Extract the content string from the first choice
const contentString = response.choices[0].message.content;
  console.log(contentString)
  // Clean the text to remove code block markers, extra quotes, or backticks
//   const cleanedText = contentString
//     .replace(/```json|```/g, "") // Remove code block markers
//     .replace(/'/g, '"')          // Replace single quotes with double quotes
//     .replace(/`/g, "")           // Remove any stray backticks
//     .trim();

let jsonData;
try {
  // Step 2: Parse the content string into a JSON object
  jsonData = JSON.parse(contentString);
  console.log('Parsed JSON data:', jsonData);
  
  // Step 3: Use jsonData in your application (for example, update state, render UI, etc.)
} catch (error) {
  console.error('Error parsing JSON:', error);
  // Optionally handle the error by notifying the user or retrying the request
}

  return jsonData;
};
