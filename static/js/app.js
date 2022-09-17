const site = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


d3.json(site).then(function(data)
   {
        console.log(data);
        let names = Object.values(data.names);
        
        valueSelect(names);
        graphs(data.samples[0])
        text(data.metadata[0])
    }
);

d3.selectAll("#selDataset").on("change", getData);

var select = document.getElementById("selDataset");
function valueSelect(list) {
    for (var i = 0; i < list.length; i++){
        let opt = list[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
};

function graphs(data) {

    let hbar = [{
        x: data.sample_values.slice(0, 10),
        y: data.otu_ids.slice(0,10),
        text: data.otu_labels.slice(0,10),
        type: "bar",
        orientation: "h",
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
          }]
    }];
    let barLayout = {
        height: 600,
        width: 800,
        yaxis:{
            type: 'category'
        }
    };

    let bubbleGraph = [{
        x: data.otu_ids,
        y: data.sample_values,
        mode: "markers",
        marker: {
            size: data.sample_values,
            color: data.otu_ids,
            colorscale: "Hot"
        },
        text: data.otu_labels,
    }];
    var bubbleLayout = {
        showlegend: false,
        height: 600,
        width: 1200,
        title: {
            text: "OTU ID",
            y: 0
        }
      };

    Plotly.newPlot("bar", hbar, barLayout);
    Plotly.newPlot("bubble", bubbleGraph, bubbleLayout);
};

function text(data){
    let pairs = Object.entries(data);
    let form = ``;
    for(var i = 0; i < pairs.length; i++)
    {
        form += `${pairs[i].join(": ")}` + "<br>";
    }
    document.getElementById("sample-metadata").innerHTML = form;
};

function getData() {
    d3.json(site).then(function(data)
   {
        let dropdown = d3.select("#selDataset");
        let dataset = dropdown.property("value");
        let newPlotData;
        let newTextData;

        for(var i = 0; i < data.names.length; i++)
        {
            if(data.names[i] == dataset)
            {
                newPlotData = data.samples[i];
                newTextData = data.metadata[i];
                break;
            }
        }
        graphs(newPlotData);
        text(newTextData); 
    }
    );
};


/*function updatePlotly(newData) {
    let update = {
        "x": [newData.sample_values.slice(0, 10)],
        "y": [newData.otu_ids.slice(0,10)],
        "text": [newData.otu_labels.slice(0,10)]
    }
    //Plotly.restyle("pie", "values", [newdata]);
    //Plotly.restyle("bar", "x", newData.sample_values.slice(0, 10));
    Plotly.update("bar", update)
  }*/