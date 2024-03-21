<svelte:head>
	<title>Meta</title>
</svelte:head>

<style>
    dl {
        display: grid;
        grid-template-columns: max-content;
        grid-gap: 5px;
    }

    dt {
        font-weight: bold;
    }

    dd {
        margin: 0;
        grid-column-start: 2;
    }

    svg {
		overflow: visible;
	}
</style>
<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";

    let data = [];
    let commits = [];
    let width = 1000, height = 600;
    let yScale;
    let xScale;
    let margin = {top: 10, right: 10, bottom: 30, left: 20};
    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left
    };
    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;

    onMount(async () => {
        data = await d3.csv("loc.csv", row => ({
                    ...row,
                    line: Number(row.line), // or just +row.line
                    depth: Number(row.depth),
                    length: Number(row.length),
                    date: new Date(row.date + "T00:00" + row.timezone),
                    datetime: new Date(row.datetime)
                }));
        
        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
                let first = lines[0];
                let {author, date, time, timezone, datetime} = first;
                let ret = {
                    id: commit,
                    url: "https://github.com/vis-society/lab-7/commit/" + commit,
                    author, date, time, timezone, datetime,
                    hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                    totalLines: lines.length
                };

                // Like ret.lines = lines
                // but non-enumerable so it doesn’t show up in JSON.stringify
                Object.defineProperty(ret, "lines", {
                    value: lines,
                    configurable: true,
                    writable: true,
                    enumerable: false,
                });

                return ret;
            });

            console.log(commits)            

            yScale = d3.scaleLinear()
                .domain([0, 24])
                .range([usableArea.bottom, usableArea.top])

            xScale = d3.scaleTime()
                .domain(d3.extent(commits.map(commit => commit.datetime)))
                .range([usableArea.left, usableArea.right] )
                .nice()
    });


    let xAxis, yAxis;
    $: {
        if (xAxis && yAxis) {
            d3.select(xAxis).call(d3.axisBottom(xScale));
            d3.select(yAxis).call(d3.axisLeft(yScale));
        }
    }

    
</script>


<h1>Meta</h1>

<h3>Commits by time of day</h3>
<svg viewBox="0 0 {width} {height}">
	<g class="dots">
        {#each commits as commit, index }
            <circle
                cx={ xScale(commit.datetime) }
                cy={ yScale(commit.hourFrac) }
                r="5"
                fill="steelblue"
            />
        {/each}
        </g>

    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
</svg>




<h3>Summary</h3>
<dl class="stats">
    <dt>Commits</dt>
	<dd>{commits.length}</dd>

	<dt>Total <abbr title="Lines of code">LOC</abbr></dt>
	<dd>{data.length}</dd>

    <dt>Longest Line</dt>
	<dd>{d3.max(data, d => d.length)}</dd>

    <dt>Average Line Length</dt>
	<dd>{Math.round(d3.mean(data, d => d.length))}</dd>

    <dt>Files</dt>
	<dd>{d3.group(data, d => d.file).size}</dd>
</dl>


