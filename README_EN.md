Flex Tables 
========= 

>##### A short presentation of this plugin to create PivotTables and easy development. 
- Easy customization 
- High performace 
- Fully independent counsel 
- Easy integration with other plugins 

###### Let's start then: 

### Table Setting 

###### Creating a simple table:

	// Element selected via their ID and attaching it to the set of events plugin
	var grid = new Grid("grid");
	
	// Columns
    grid.setColumns(["Nome", "Preco", "Unidade"]);
    
    // Column size in px
    grid.setWidthColumns(["*", "100", "100"]);
    
    // Size columns in percentage (remembering that the sum of all vector has to be 100)
    // grid.setWidthColumsPercent(["*", "30", "10"]);
    
    // Type of columns
    grid.setColumnsType(["str", "flt", "int"]);
    
    // Event Type Double click the (Default: noEvent)
    grid.setColumnsEvents(["edit", "noEvent", "number"]);

    // Startup grid
    grid.init({"rows": [{
		"id": "864",
		"data": ["Produto Proprio 1", "10.00", "2"]
	}, {
		"id": "865",
		"data": ["Produto Proprio 2", "0.00", "0"]
	}]});
