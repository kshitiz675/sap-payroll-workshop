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

No build tools are necessary. Simply open the `index.html` file in your web browser. All dependencies (Tailwind CSS) are loaded from a CDN, and the accompanying JavaScript (`script.js`) contains all interactive logic.

## Folder structure

```
sap-payroll-workshop/
├── index.html     # Main HTML document with the stepper and form content
├── script.js      # JavaScript functions for navigation and dynamic tables
├── payslip.png    # Generated sample payslip used in step 12
└── README.md      # This readme file
```

## Notes

This project is an independently developed replica and is **not** affiliated with SAP.  
It aims to mirror the workflow of the original tool shared via Google Gemini by providing similar headings, input fields and interactions.  
You are free to adapt this code to suit your own implementation workshops.