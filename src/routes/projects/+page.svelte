<script> 
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    import Pie from '$lib/Pie.svelte';
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<Pie/>
<h1>Projects { projects.length }</h1>
<div class="projects">
{#each projects as p}
    <Project info={p} />
{/each}

</div>