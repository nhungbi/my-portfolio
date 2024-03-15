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


</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<Pie data={pieData1}/>

<h1>Projects { projects.length }</h1>
<div class="projects">
{#each projects as p}
    <Project info={p} />
{/each}

</div>