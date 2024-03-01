<svelte:head>
	<title>Contact</title>
</svelte:head>

<h1>Contact</h1>

<form class="contact-form" action="mailto:nhung16@mit.edu" method="POST" enctype="text/plain">
    <label class="contact-elements" for="email">Email: 
        <input name="email" type="email"/> </label>
    <label class="contact-elements" for="subject">Subject:
        <input name="subject" type="text"/> </label>
    <label class="contact-elements" for="body">Body of message: 
        <textarea name="body"></textarea> </label>
    <button class="contact-elements">Submit</button>
</form>