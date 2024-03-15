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

    let rolledData = d3.rollups(projects, v => v.length, d => d.year);

    let pieData1 = rolledData.map(([year, count]) => {
        return { value: count, label: year };
    });

    let query = "";

    let filteredProjects;
    $: filteredProjects = projects.filter(project => {
        if (query) {
            return project.title.includes(query);
        }

        return true;
    });




</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<h1>Projects { projects.length }</h1>

<Pie data={pieData1}/>

<input type="search" bind:value={query}
       aria-label="Search projects" placeholder="🔍 Search projects…" />


<div class="projects">
{#each filteredProjects as p}
    <Project info={p} />
{/each}

</div>