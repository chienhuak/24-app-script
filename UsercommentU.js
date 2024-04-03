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
      try {
        // 根据文件的 URL 打开电子表格
        var spreadsheet = SpreadsheetApp.openByUrl(fileUrl);
        // 获取所有的工作表
        var sheets = spreadsheet.getSheets();
        
        // 遍历每个工作表
        sheets.forEach(function(sheet) {
          Logger.log("正在处理工作表：" + sheet.getName());
          
          // 获取第 14 行的数据范围
          var row14Range = sheet.getRange(14, 1, 1, sheet.getLastColumn());
          // 获取第 14 行的所有单元格的值
          var row14Values = row14Range.getValues()[0];
          Logger.log("第 14 行的值：" + row14Values.join(", "));
          
          // 手动指定 "User Comment" 的单元格列索引
          var columnIndex = row14Values.indexOf("User Comment") !== -1 ? row14Values.indexOf("User Comment") + 1 : 0;
          Logger.log("找到 'User Comment' 的单元格在第 " + columnIndex + " 列");
          
          // 如果找到 "User Comment" 的单元格
          if (columnIndex > 0) {
            // 获取该列的数据范围，从第 15 行到最后一行
            var columnRange = sheet.getRange(15, columnIndex, sheet.getLastRow() - 14, 1);
            // 获取该列的所有单元格的值
            var columnValues = columnRange.getValues();
            
            // 遍历该列的每个单元格
            columnValues.forEach(function(cellRow, rowIndex) {
              // 检查单元格的值是否包含特定文本
              if (typeof cellRow[0] === 'string' && cellRow[0].indexOf("User CommentU") !== -1) {
                Logger.log("找到 'User CommentU' 的单元格在第 " + (rowIndex + 15) + " 行，第 " + columnIndex + " 列");
                // 将包含特定文本的单元格内容替换为 "User Comment"
                cellRow[0] = "User Comment";
              }
            });
            
            // 更新工作表中指定范围的单元格内容
            columnRange.setValues(columnValues);
            Logger.log("更新了工作表：" + sheet.getName());
          }
        });
      } catch (error) {
        // 捕获并记录错误
        Logger.log("在处理 " + fileUrl + " 时出现错误：" + error);
      }
    });
  }