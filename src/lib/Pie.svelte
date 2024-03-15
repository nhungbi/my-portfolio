<script>
    import * as d3 from 'd3';

    let data = [
        { value: 1, label: "apples" },
        { value: 2, label: "oranges" },
        { value: 3, label: "mangos" },
        { value: 4, label: "pears" },
        { value: 5, label: "limes" },
        { value: 5, label: "cherries" }
    ];

    let colors = d3.scaleOrdinal(d3.schemeTableau10);


    // let angle = 0;
    // let arcData = [];
    // for (let d of data) {
    //    let endAngle = angle + (d / total) * 2 * Math.PI;
    //    arcData.push({ startAngle: angle, endAngle });
    //    angle = endAngle;
    // }

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    // let arcs = arcData.map(d => arcGenerator(d));

    // cleaner way
    let sliceGenerator = d3.pie().value(d => d.value);
    let arcData = sliceGenerator(data);
    let arcs = arcData.map(d => arcGenerator(d));

</script>
<style>

    svg {
        max-width: 20em;
        margin-block: 2em;

        /* Do not clip shapes outside the viewBox */
        /* overflow: visible; */
    }

    .swatch {
        width: 15px;
        height: 15px;
        background-color: var(--color);
        display: inline-block; 
        border-radius: 50%;
    }

    .legend {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
        border: solid rgb(159, 157, 157) 1px;
        padding: 1rem;
        gap: 10px;
        margin: 1rem;
        flex: 1;
    }

    .legend-elt {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }


</style>

<div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, i}
            <path d={ arc } fill={ colors(i) } />
        {/each}
    </svg>

    <ul class="legend">
        {#each data as d, index}
            <li class = "legend-elt" style="--color: { colors(index) }">
                <span class="swatch"></span>

                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>



