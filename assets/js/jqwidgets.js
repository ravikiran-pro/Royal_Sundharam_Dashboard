///generating base width
function GenerateWidth(){
    var width=window.innerWidth;
    if(width<968) width=90;
    else {
        width-=400;
        width=parseInt(width/7);
    }
    return width;
}

function SetupJqWidgets(){
    var data = new Array();
    
    // create a data source and data adapter
    var Header=['Opening os claim','live count','claims paid','xol cost','live count','claims unpaid'];
    
    // data[0]={'HeaderCost':'Opening Os Claim','productname':'DateRange','ActualTotalCost':0,'EstimatedBudgetCost':0};
    // data[1]={'HeaderCost':'Opening Os Claim','SubCost':'claim','productname':'DateRange','ActualTotalCost':3,'EstimatedBudgetCost':4};
    // data[2]={'HeaderCost':'Opening Os Claim','SubCost':'claim1','productname':'DateRange','price':3,'ActualTotalCost':8,'EstimatedBudgetCost':10};
    
    // data[3]={'HeaderCost':'Opening Os Claim','productname':'DateRange1','ActualTotalCost':0,'EstimatedBudgetCost':0};
    // data[4]={'HeaderCost':'Opening Os Claim','SubCost':'claim','productname':'DateRange1','ActualTotalCost':3,'EstimatedBudgetCost':4};
    // data[5]={'HeaderCost':'Opening Os Claim','SubCost':'claim1','productname':'DateRange1','price':3,'ActualTotalCost':8,'EstimatedBudgetCost':10};
    
    // data[6]={'HeaderCost':'Opening Os Claim','productname':'DateRange2','ActualTotalCost':0,'EstimatedBudgetCost':10};
    // data[7]={'HeaderCost':'Opening Os Claim','SubCost':'claim','productname':'DateRange2','ActualTotalCost':3,'EstimatedBudgetCost':4};
    // data[8]={'HeaderCost':'Opening Os Claim','SubCost':'claim1','productname':'DateRange2','price':3,'ActualTotalCost':8,'EstimatedBudgetCost':4};

    // data[9]={'HeaderCost':'Opening Os Claim','productname':'DateRange','ActualTotalCost':0,'EstimatedBudgetCost':0};
    // data[10]={'HeaderCost':'Opening Os Claim','SubCost':'claim','productname':'DateRange','ActualTotalCost':3,'EstimatedBudgetCost':4};
    // data[11]={'HeaderCost':'Opening Os Claim','SubCost':'claim1','productname':'DateRange','price':3,'ActualTotalCost':8,'EstimatedBudgetCost':10};
    
    // data[12]={'HeaderCost':'change','productname':'DateRange1','ActualTotalCost':0,'EstimatedBudgetCost':0};
    // data[13]={'HeaderCost':'change','SubCost':'claim','productname':'DateRange1','ActualTotalCost':3,'EstimatedBudgetCost':4};
    // data[14]={'HeaderCost':'change','SubCost':'claim1','productname':'DateRange1','price':3,'ActualTotalCost':8,'EstimatedBudgetCost':10};
    
    // data[15]={'HeaderCost':'change','productname':'DateRange2','ActualTotalCost':0,'EstimatedBudgetCost':10};
    // data[15]={'HeaderCost':'change','SubCost':'claim','productname':'DateRange2','ActualTotalCost':3,'EstimatedBudgetCost':4};
    // data[16]={'HeaderCost':'change','SubCost':'claim1','productname':'DateRange2','price':3,'ActualTotalCost':8,'EstimatedBudgetCost':4};
    var firstNames =
    [
        "Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
    ];
    var lastNames =
    [
        "Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
    ];
    var productNames =
    [
        "Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"
    ];
    var priceValues =
    [
        "2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
    ];
    for (var i = 0; i < 500; i++) {
        var row = {};
        var productindex = Math.floor(Math.random() * productNames.length);
        var price = parseFloat(priceValues[productindex]);
        var quantity = 1 + Math.round(Math.random() * 10);
        row["HeaderCost"] = firstNames[Math.floor(Math.random() * 10)];
        row["SubCost"] = lastNames[Math.floor(Math.random() * lastNames.length)];
        row["productname"] = productNames[ Math.floor(Math.random() * 3)];
        row["ActualTotalCost"] = price;
        row["EstimatedBudgetCost"] = quantity;
        row["total"] = price * quantity;
        data[i] = row;
    }
    
    var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'HeaderCost', type: 'string' },
            { name: 'SubCost', type: 'string' },
            { name: 'productname', type: 'string' },
            { name: 'ActualTotalCost', type: 'number' },
            { name: 'EstimatedBudgetCost', type: 'number' }
        ]
    };
    var width=GenerateWidth();
    var dataAdapter = new $.jqx.dataAdapter(source);
    dataAdapter.dataBind();
    // create a pivot data source from the dataAdapter
    var pivotDataSource = new $.jqx.pivot(
        dataAdapter,
        {
            pivotValuesOnRows: false,
            rows: [{ dataField: 'HeaderCost',width:width}, { dataField: 'SubCost'}],
            columns: [{ dataField: 'productname',width:width*2}],
            values: [
                { dataField: 'ActualTotalCost',width:width,'function': 'sum', text: 'Actual', formatSettings: { prefix: '$', decimalPlaces: 2} },
                { dataField: 'EstimatedBudgetCost',width:width,'function':'sum', text: 'Budget', formatSettings: { prefix: '$', decimalPlaces: 2 } }
            ]
        });
    // create a pivot grid
    $('#divPivotGrid').jqxPivotGrid(
        {
            source: pivotDataSource,
            treeStyleRows: true, // change this property to switch between treestyle and olap style display
            autoResize:true,
            multipleSelectionEnabled: false,   
        });

}
// prepare sample data
            
SetupJqWidgets();