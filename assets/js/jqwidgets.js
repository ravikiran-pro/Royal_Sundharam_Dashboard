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
    ///Sample Mock Data
    var Header =
    [
        "Opening OS Claim","Live Cost","Claim Part","XDL Cost","Live Count","Claims Paid","Operating Cost",
    ];
    var productNames =
    [
        "DateRange1","DateRange2","DateRange3"
    ];
    var priceValues =
    [
        "2000025", "100005", "300000", "300003", "400005", "300006", "300008", "200005", "500000", "1000075", "3000025", "400000"
    ];
    for (var i = 0; i < 500; i++) {
        var row = {};
        var productindex = Math.floor(Math.random() * Header.length);
        var price = Math.round(Math.random() * 10);
        var quantity = 1 + Math.round(Math.random() * 10);
        row["HeaderCost"] = Header[Math.floor(Math.random() * Header.length)];
        row["SubCost"] = "claim"+Math.floor(Math.random() * Header.length);
        row["productname"] = productNames[ Math.floor(Math.random() * 3)];
        row["ActualTotalCost"] = priceValues[Math.floor(Math.random()*3)];
        row["EstimatedBudgetCost"] = quantity;
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
                { dataField: 'ActualTotalCost',width:width,'function': 'sum', text: 'Actual', formatSettings: { prefix: '', decimalPlaces: 0} },
                { dataField: 'EstimatedBudgetCost',width:width,'function':'sum', text: 'Budget', formatSettings: { prefix: '', decimalPlaces: 0 } }
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