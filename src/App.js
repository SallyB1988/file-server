import React from "react";
import MainForm from "./components/MainForm";
import { FilePicker } from "react-file-picker";
import XLSX from "xlsx";
import "./App.css";

const loadFile = fileObj => {
  var name = fileObj.name;
  console.log("you picked ", name);
  var url = "C:\\PycharmProjects\\Palmer Project\\" + name;
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
    var arraybuffer = oReq.response;

    // Convert data ot binary string
    var data = new Uint8Array(arraybuffer);
    var arr = [];
    for (var i = 1; i != data.length; ++i)
      arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    // Call XLSX
    var workbook = XLSX.read(bstr, { type: "binary" });

    var first_sheet_name = workbook.SheetNames[0];
    // Get worksheet
    var worksheet = workbook.Sheets(first_sheet_name);
    console.log(XLSX.utils.sheet_to_json(worksheet));
  };
  oReq.send();
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Quarterly Report</p>
      </header>
      <MainForm />
      <FilePicker
        extensions={["xlsx", "xls"]}
        onChange={FileObject => loadFile(FileObject)}
        onError={errMsg => console.log(errMsg)}
      >
        <button>Select File</button>
      </FilePicker>
    </div>
  );
}

export default App;
