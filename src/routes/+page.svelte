<script> 
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
</script>
<h1 class="home" >Nhung Van</h1>
<p>I'm a junior studying CS and AI.</p>
<img class = 'panda-img' src="./images/panda.png" alt="A picture of a panda.">
<h2> Latest Projects </h2>
<div class="projects highlights">
    {#each projects.splice(0,3) as p}
        <Project info={p} hLevel=3 />
    {/each}
</div>