# SAP Payroll Workshop Tool (Replica)

This repository contains a simple, self‑contained web application that replicates the structure and purpose of the *SAP Australian Payroll Implementation – Requirements Gathering Workshop Tool*.  
It is designed to guide consultants and customers through a payroll implementation workshop using a multi‑step wizard interface.  
Each step captures specific information about the organisation’s payroll requirements, from project details and enterprise structure through to finance integration, PCC KPIs and reporting needs.

## Features

* **Multi‑step wizard** – A vertical stepper on the left indicates progress through 13 sections. Navigation buttons allow users to move forwards and backwards.
* **Tailwind CSS styling** – The UI uses Tailwind CSS via CDN for clean, responsive design without any build step.
* **Forms for each topic** – Steps include text inputs, text areas, dropdowns and checkboxes to collect detailed information on topics such as awards, payroll processing, termination rules and PCC alerts.
* **Dynamic tables** – Users can add rows to payment and deduction catalogues, redundancy pay scales, payroll report listings and interface definitions. Items can also be removed.
* **Simple AI explainer** – The “AI Config Explainer” step provides short, pre‑defined explanations for selected configuration settings.
* **Interactive payslip preview** – A generated sample payslip image is included to help visualise typical earnings, deductions and net pay sections.

## Running the application

This repository now contains both a lightweight **backend** and a **frontend**. The backend is a simple Node.js server that accepts JSON submissions and persists them to disk. The frontend is still a static HTML/JS wizard which will POST the collected data to the backend when the final step is reached.

1. **Start the backend server**

   From the root of the project directory, run the following command to start the HTTP server on port 3000:

   ```bash
   node server.js
   ```

   The server will listen for POST requests at `/submit` and will save the submitted data to a `data.json` file in the project root.
   You can inspect this file after submission to view the captured workshop responses.

2. **Open the frontend**

   Open the `index.html` file in your preferred web browser. Proceed through the steps as before. When you reach the final step, a **Submit** button will appear. Clicking this button will send your form data to `http://localhost:3000/submit`.

   If the backend is running, you will receive a confirmation message and the data will be stored in `backend/data.json`.

## Folder structure

```
sap-payroll-workshop/
├── server.js           # Node.js server handling POST submissions and persisting data
├── data.json          # Automatically created file containing the last submitted data
├── index.html          # Main HTML document with the stepper and form content
├── script.js           # JavaScript functions for navigation, dynamic tables and API submission
├── payslip.png         # Generated sample payslip used in the interactive payslip step
└── README.md           # This readme file
```

## Notes

This project is an independently developed replica and is **not** affiliated with SAP.  
It aims to mirror the workflow of the original tool shared via Google Gemini by providing similar headings, input fields and interactions.  
You are free to adapt this code to suit your own implementation workshops.