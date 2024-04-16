<script>
    import * as d3 from 'd3';

    export let data = [];

    export let colors = d3.scaleOrdinal(d3.schemeTableau10);

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    // cleaner way
    // let sliceGenerator = d3.pie().value(d => d.value);
    let sliceGenerator = d3.pie().value(d => d.value).sort(null);

   
    export let selectedIndex = -1;

    function toggleWedge (index, event) {
        if (!event.key || event.key === "Enter") {
            selectedIndex = selectedIndex === index ? -1 : index;
        } 
    }

    let pieData = [];
    let oldData = [];

    $: {
        pieData = d3.sort(data, d => d.label);
        oldData = pieData;
        pieData = data.map(d => ({...d}));
        let arcData = sliceGenerator(data);
        let arcs = arcData.map(d => arcGenerator(d));
        pieData = pieData.map((d, i) => ({...d, ...arcData[i], arc: arcs[i]}));
        // console.log(data)
        transitionArcs()
    };

    function sameArc(d_old, d) {
        if (d_old && d) {
            if (d_old.startAngle === d.startAngle &&
                d_old.endAngle === d.endAngle) {
                    return true
                }
            return false
        }

        return true
    }

    function transitionArc (wedge, label) {
        label ??= Object.entries(wedges).find(([label, w]) => w === wedge)[0];

        let d = pieData.find(d => d.label === label);
        let d_old = oldData.find(d => d.label === label);

        let from = d_old ? {...d_old} : getEmptyArc(label, oldData);
        let to = d ? {...d} : getEmptyArc(label, oldData);

        let angleInterpolator = d3.interpolate(from, to);


        let interpolator = t => `path("${ arcGenerator(angleInterpolator(t)) }")`;

        let type = d ? d_old ? "update" : "in" : "out";


        return {d, d_old, from, to, type, interpolator};
    }


    let wedges = {};
    function transitionArcs() {
        let wedgeElements = Object.values(wedges);

        d3.selectAll(wedgeElements).transition("arc")
            .duration(transitionDuration)
            .styleTween("d", function (_, index) {
                let wedge = this;
                // Calculations that will only be done once per element go here
                let label = Object.keys(wedges)[index];

                // let d = pieData.find(d => d.label === label);
                // let d_old = oldData.find(d => d.label === label);

                // let from = d_old ? {...d_old} : getEmptyArc(label, oldData);
                // let to = d ? {...d} : getEmptyArc(label, oldData);

                // let angleInterpolator = d3.interpolate(from, to);
                // let interpolator = t => `path("${ arcGenerator(angleInterpolator(t)) }")`;

                let transition = transitionArc(wedge, label);
                if (sameArc(transition.d_old, transition.d)) {
                    return null;
                }
                return transition?.interpolator;

                // return interpolator;

            });
    }

    function getEmptyArc (label, data = pieData) {
        // Union of old and new labels in the order they appear
        let labels = d3.sort(new Set([...oldData, ...pieData].map(d => d.label)));
        let labelIndex = labels.indexOf(label);
        let sibling;
        for (let i = labelIndex - 1; i >= 0; i--) {
            sibling = data.find(d => d.label === labels[i]);
            if (sibling) {
                break;
            }
        }

        let angle = sibling?.endAngle ?? 0;
        return {startAngle: angle, endAngle: angle};
    }


    let transitionDuration = 2000;

    function arc (wedge) {
        // Calculations that will only be done once per element go here
        let transition = transitionArc(wedge, undefined);

        return {
            duration: transitionDuration,
            css: (t, u) => {
                // t is a number between 0 and 1 that represents the transition progress; u is 1 - t
                // TODO return CSS to be applied for the current t as a string
                return transition?.interpolator(transition.type === "out" ? u : t)
            },
            easing: d3.easeCubic()
        }
}







</script>

<style>

    svg {
        max-width: 20em;
        margin-block: 2em;

        /* Do not clip shapes outside the viewBox */
        /* overflow: visible; */
    }

    svg:has(path:hover, path:focus-visible) {
        path:not(:hover, :focus-visible) {
            opacity: 50%;
        }
    }


    path {
	    transition: 300ms;
        cursor: pointer;
        outline: none;
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

    .selected {
        --color: oklch(60% 45% 0) !important;

        &:is(path) {
            fill: var(--color);
        }
    }

    .container d {
        transition: 300ms;
        transition-property: transform, opacity, fill;

    } 


    
</style>

<div class="container">
    <svg viewBox="-50 -50 100 100">

        {#each pieData as d, index (d.label)}
	        <path d={d.arc} fill={ colors(d.label)}
            class:selected={selectedIndex === index}
                on:click={e => toggleWedge(index, e)}
                on:keyup={e => toggleWedge(index, e)}
                bind:this={ wedges[d.label] }
                transition:arc
                />
        {/each}
    
    </svg>

    <ul class="legend">
        {#each pieData as d, index}
            <li class = "legend-elt" style="--color: {  colors(d.label) }">
                <span class="swatch" class:selected={selectedIndex === index}></span>

                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>



