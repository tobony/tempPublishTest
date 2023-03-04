async function deleteSampleTable(){return Excel.run((async e=>{try{e.workbook.worksheets.getItem("Sample").tables.getItem("SalesTable").delete(),await e.sync()}catch(e){if("ItemNotFound"===e.code)return;throw console.log("deleteSampleTable function failed"),console.error(e),e}}))}async function createSampleTable(e){return await deleteSampleTable(),Excel.run((async t=>{let a=t.workbook.worksheets.getItem("Sample"),l=a.getRange("A1");l.values="sqlMockData"===e?[["Data source: SQL Database"]]:[["Data source: External Excel File"]],l.format.autofitColumns();let n=a.tables.add("A2:E2",!0);n.name="SalesTable",n.getHeaderRowRange().values=[["Product","Qtr1","Qtr2","Qtr3","Qtr4"]];const o=getGlobal();return"sqlMockData"===e?n.rows.add(null,o.sqlMockData.data):"excelFileMockData"===e&&n.rows.add(null,o.excelFileMockData.data),a.getUsedRange().format.autofitColumns(),a.getUsedRange().format.autofitRows(),a.activate(),a.getRange("A2").select(),await t.sync(),n.onSelectionChanged.add(onSelectionChange),n.onChanged.add(onChanged),t.sync()}))}async function createSampleWorkSheet(){Excel.run((async e=>{try{e.workbook.worksheets.add("Sample"),await e.sync()}catch(e){if("ItemAlreadyExists"===e.code)return;throw console.error(e),e}}))}async function getTableData(){let e=null;return Excel.run((async t=>{const a=t.workbook.worksheets.getItem("Sample").tables.getItem("SalesTable").getDataBodyRange().load("values");return await t.sync(),e=a.values,e}))}function onSelectionChange(e){let t=getGlobal();t.isTableSelected!==e.isInsideTable&&(t.isTableSelected=e.isInsideTable,setContextualTabVisibility(e.isInsideTable))}function onChanged(){let e=getGlobal();e.isTableDirty||(e.isTableDirty=!0,setSyncButtonEnabled(!0))}function setContextualTabVisibility(e){let t=getGlobal();t.contextualTab.tabs[0].visible=e;try{Office.ribbon.requestUpdate(t.contextualTab)}catch(e){console.error(e)}}function setSyncButtonEnabled(e){let t=getGlobal();t.contextualTab.tabs[0].groups[1].controls[0].enabled=e,t.contextualTab.tabs[0].groups[1].controls[1].enabled=e,Office.ribbon.requestUpdate(t.contextualTab)}