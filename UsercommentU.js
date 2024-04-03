function replaceTextInRow14ForMultipleFiles() {
    // 要处理的 Google Sheets 文件的 URL 列表
    var fileUrls = [
      'https://docs.google.com/spreadsheets/d/1yAlFPCrRezKha4Sr6mkCHp4L7EYA5fNKv8z8sX117KY/edit?resourcekey=0-Cgk3-67LtrJrs4JXgIO0_A#gid=551341384',
      'https://docs.google.com/spreadsheets/d/1Be-6vj4IaC_HkNibtIgDNbp38AWC2oYjuKAMSRt7nNA/edit#gid=1254634263',
      'https://docs.google.com/spreadsheets/d/1lglwYv0tZR2Atz7NsF92kNPAdDg4FS_Pmph4Cm_8gl8/edit#gid=1674933088',
      'https://docs.google.com/spreadsheets/d/10pIkp9ZATHrh-Ww_UKzFMzKXTXrRH8ms_2iUSl2bwZo/edit#gid=1230689293',
      'https://docs.google.com/spreadsheets/d/1Kex-Qvqtddc9gyArxcvoXHrb8DLh6T-JP2O5Y0RUlOU/edit#gid=2028715013',
      'https://docs.google.com/spreadsheets/d/1BHlHEEV5ApVtCF5EpmJhDKIa6fSfNuls_Bkx9KcUeZg/edit#gid=1065102619',
      'https://docs.google.com/spreadsheets/d/1cdkIdDs--rN52AI33SO9qwk84Fk_pfq6hwvXbgsiYyM/edit#gid=1958259646',
      'https://docs.google.com/spreadsheets/d/1dRXI2NE6DzWfe-cWOrirnp3ZOS70NnaZYHTyfPqGMXM/edit#gid=1045224154'
      // 添加更多文件的 URL
    ];
  
    // 遍历每个文件的 URL
    fileUrls.forEach(function(fileUrl) {
      // 根据文件的 URL 打开电子表格
      var spreadsheet = SpreadsheetApp.openByUrl(fileUrl);
      // 获取所有的工作表
      var sheets = spreadsheet.getSheets();
      
      // 遍历每个工作表
      sheets.forEach(function(sheet) {
        // 获取工作表的数据范围
        var range = sheet.getRange("14:14");
        // 获取数据范围内的所有单元格的值
        var values = range.getValues()[0]; // 只获取第一行的值，因为我们只搜索第 14 行
        
        // 遍历第 14 行的每个单元格
        values.forEach(function(cellValue, col) {
          // 检查单元格的值是否包含特定文本
          if (typeof cellValue === 'string' && cellValue.indexOf("User CommentU") !== -1) {
            // 将包含特定文本的整个单元格内容替换为新文本
            values[col] = "User Comment";
          }
        });
        
        // 更新工作表中第 14 行的单元格内容
        range.setValues([values]);
      });
    });
  }
  