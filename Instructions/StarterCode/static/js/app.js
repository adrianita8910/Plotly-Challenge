function init(){
    // Creating a dropdown menu variable
    var dropdownMenu = d3.select("#selDataset");

    // I'm using d3 library ro read sample.json
    d3.json("./data/samples.json").then((data) => {
        console.log(data);
        var names = data.names;
        data = fetch("./data/samples.json")

        names.forEach((sample) => {
            dropdownMenu.append("option")
                .text(sample)
                .property("value", "sample");
        });

        var IntDisplay = names[0];
        build_barchart(IntDisplay);
        build_bubble(IntDisplay);
        build_meta(IntDisplay);
    });
}

function optionChanged(new_name) {
    build_barchart(new_name);
    build_bubble(new_name);
    build_meta(new_name);
}

function build_barchart(sample){
    d3.json("./data/samples.json").then((data) => {
        console.log(data);
        var samples = data.samples;
        var sample2 = samples.filter(sampleID => sampleID.id == sample);
        var object = sample2[0];

        var otu_ids = object.otu_ids;
        var otu_labels = object.otu_labels;
        var sample_values = object.sample_values;

        var barChart_layout ={
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 40, 1: 140} 
        };

        var barChart_trace = [
            {
                y: otu_ids.splice(0, 10).map(otuID => `OTU ID: ${otuID}`).reverse(),
                x: sample_values.splice(0, 10).reverse(),
                text: otu_labels.splice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];
        Plotly.newPlot("bar", barChart_trace, barChart_layout);
    });
}

function build_bubble(sample) {
    d3.json("./data/samples.json").then((data) => {
        console.log(data);
        var samples = data.samples;
        var sample2 = samples.filter(sampleID => sampleID.id == sample);
        var object = sample2[0];

        var otu_ids = object.otu_ids;
        var otu_labels = object.otu_labels;
        var sample_values = object.sample_values;

        var bubbleChart_layout = {
            title: "OTUs Occurance",
            showlegend: false,
            height: 500,
            width: 1200
        };

        var bubbleChart_trace = [
            {
                y: sample_values,
                x: otu_ids,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    color: otu_ids,
                    size: sample_values
                } 
            }
        ];
        Plotly.newPlot("bubble", bubbleChart_trace, bubbleChart_layout);
    });
}

function build_meta(sample) {
    d3.json("./data/samples.json").then((data) => {
        console.log(data);
        var samples = data.samples;
        var sample3 = samples.filter(sampleID => sampleID.id == sample);
        var object2 = sample3[0];

        var Display = d3.select("#sample-metadata");

        Display.html("");

        Object.entries(object2).foeEach(([key, value]) => {
            Display.append("p").text(`${key}:${value}`);
        });
    });
}

init()