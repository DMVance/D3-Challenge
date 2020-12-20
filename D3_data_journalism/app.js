const svgHeight = 600
const svgWidth = 1200

const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 500
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
        .domain([0, d3.max(data.map(d => parseInt(d.healthcare) + 2))])
        .range([chartHeight, 0])

    const x = d3.scaleLinear()
        .domain([d3.min(data.map(d => parseInt(d.poverty - 1))), d3.max(data.map(d => parseInt(d.poverty) + 2))])
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

    // svg.append("text")
    //     .attr("class", "y label")
    //     .attr("text-anchor", "end")
    //     .attr("y", 450)
    //     .attr("dx", ".1em")
    //     .attr("transform", "rotate(-90)")
    //     .text("Lacks Healthcare (%)");

    labelArea.append("text")
        .attr("stroke", "#000000")
        .text("Lacks Healthcare (%) (y-axis) vs. In Poverty (%) (x-axis)");

})