<script> 
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    import Pie from '$lib/Pie.svelte';
    import * as d3 from "d3";

    let pieData = [
        { value: 1, label: "apples" },
        { value: 2, label: "oranges" },
        { value: 3, label: "mangos" },
        { value: 4, label: "pears" },
        { value: 5, label: "limes" },
        { value: 5, label: "cherries" }
    ];

    let query = "";

    let filteredProjects;
    let filteredByYear;
    $: filteredProjects = projects.filter((project) => {
        if (query) {
            let values = Object.values(project).join("\n").toLowerCase();
            return values.includes(query.toLowerCase());
        }

        return true;
    });

    $:  filteredByYear = filteredProjects.filter((project) => {
        if (selectedYear) {
		    return project.year === selectedYear;
	    }

        return true;
    });

    // Make sure the variable definition is *outside* the block
    let pieData1;
    $: {
        // Initialize to an empty object every time this runs
        pieData = {};

        // Calculate rolledData and pieData based on filteredProjects here
        let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);

        pieData1 = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
    }
    let selectedYearIndex = -1;
    let selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData1[selectedYearIndex].label : null;


</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<h1>Projects { projects.length }</h1>

<Pie data={pieData1} bind:selectedIndex={selectedYearIndex} />


<input type="search" bind:value={query}
       aria-label="Search projects" placeholder="🔍 Search projects…" />


<div class="projects">
    {#each filteredByYear as p}
        <Project info={p} />
    {/each}
</div>