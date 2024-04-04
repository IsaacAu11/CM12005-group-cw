<script>
	import StudyLog from "../../components/StudyLog.svelte";
	import StudyTimeThisWeek from "../../components/StudyTimeThisWeek.svelte";

</script>
<div class="h-screen flex items-center justify-between">
	<!-- Main Component and Study Log Component -->
	<div class="w-full h-full flex flex-col items-center justify-end">
		<div class="pt-5 px-5 w-3/4 h-5/6 rounded-lg bg-secondary drop-shadow-2xl">
			<h1 class="text-center font-bold text-4xl" style="padding-bottom: 20px;">Statistics</h1> 
            <p style="border-width: 0px 60px;border-color: white;">
                Your personalized guide to understanding your study patterns and progress! This comprehensive report provides valuable insights into your learning journey, empowering you to make informed decisions and optimize your study habits. We hope with this report, you'll gain valuable knowledge to elevate your academic success to new heights!
            </p>
            <div style="border-;margin-left: 80px;margin-right: 80px; background-color: white; margin-top: 50px">
                <div style="display: flex;flex-wrap: wrap; height: 400px" > 
                    <div class = "flex-item" style="background-color: rgb(229, 231, 235);height: 200px;"><StudyTimeThisWeek/></div> 
                    <div class = "flex-item" style="background-color: rgb(229, 231, 235);height: 200px;">Study time this month</div> 
                    <div class = "flex-item" style="background-color: rgb(229, 231, 235); width: 38%; height: 200px;">Mood this month</div> 
                    <div class = "flex-item" style="background-color: rgb(229, 231, 235); width: 58%; height: 200px;">Your study locations</div> 
                </div> 
            </div>
		</div>
	</div>
    <StudyLog />
</div>

<style>
    .flex-item{
        margin: 1%;
        width: 48%;
		border-radius: 10px;
    }
</style>
