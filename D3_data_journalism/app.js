const svgHeight = 400
const svgWidth = 1000

const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  }

const chartHeight = svgHeight - margin.top - margin.bottom
const chartWidth = svgWidth - margin.left - margin.right

const svg = d3.select("body").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)

const chartG = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .classed("chart-group", true)

d3.csv("data.csv").then(data => {

    console.log(data)

    const y = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => parseInt(d.healthcare)))])
    .range([chartHeight, 0])

    const x = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => parseInt(d.poverty)))])
        .range([0, chartWidth])

    const yAxis = d3.axisLeft(y)
    const xAxis = d3.axisBottom(x)

    chartG.append("g")
        .call(yAxis)

    chartG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)

    const labelArea = svg
    .append("g")
    .attr(
        "transform",
        `translate(${svgWidth / 2}, ${svgHeight - margin.bottom + 30})`
    );
    
    labelArea.append("text").attr("stroke", "#000000").text("Poverty");

    chartG.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.poverty))
        .attr("cy", d => y(d.healthcare))
        .attr("stroke", "#5193e8")
        .style("fill", "#5193e8")
        .attr("r", 12)

    const plotArea = chartG.append("g")
        .classed("plot-area", true)
    const circleG = plotArea.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", d => `translate(${x(d.poverty)}, ${y(d.healthcare)})`)

    circleG.append("text")
        .text(d => d.abbr)
        .attr("stroke", "#FFFFFF")
        .style("fill", "#FFFFFF")
        .attr("dy", ".3em")
        .attr("text-anchor", "middle")




    // labelArea
    // .append("text")
    // .attr("stroke", "#000000")
    // .attr("abbr", 14)
    // .text("Evening");

    // const line = d3.line()
    //     .x(d => x(parseDate(d.date)))
    //     .y(d => y(d.morning))

    // chartG.append("path")
    //     .attr("d", line(data))
    //     .attr("fill", "none")
    //     .attr("stroke", "#FF0000")

    // console.log(line(data))

    

})


    // python -m http.server