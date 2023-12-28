---
tags:
  - rewards-log
---
<%*
const week_day_client = tp.user.week_day(tp)
await tp.file.move(week_day_client.get_rewards_weekly_title_page())
let current_week_day = tp.user.week_day(tp, tp.file.title)
-%>

<%*
// DataviewJS Script
const goals_file_name = await current_week_day.get_goals_file_matcher();

const dv = this.app.plugins.plugins["dataview"].api;
const completed_goals = countCompletedGoals(goals_file_name);
const amount = getRewardAmount(completed_goals);
const can_get_item = canGetItem(completed_goals);
const rewardMessage = getRewardMessage(completed_goals, can_get_item);

// Create an array of strings for the results
const results = [
    'Goals Completed this week: ' + completed_goals,
    rewardMessage
];

// Convert results to a string with line breaks
const resultsString = results.join('\n');

// Output the results to the template
tR += resultsString;

function countCompletedGoals(fileName) {
    let completedCount = 0;

    // Fetch the file and count completed tasks
    dv.pages(`"${fileName}"`)
        .file.tasks
        .where(task => task.completed) // Ensure this reflects how you mark tasks as completed
        .forEach(() => completedCount++);
    
    return completedCount;
}

function getRewardMessage(amount, item) {
	let response = "No rewards this week. Keep pushing!"
    if (amount >= 1) {
	    response = "Reward: <span class='green'>" + amount + "$ Added to Bank</span>";
	   
    }
     if (item) {
		response = "Rewards:\n- <span class='green'>" + amount + "$ Added to Bank</span>\n- <span class='green'>Can Purchase One Toy or Experience</span>";
	}
    return response
}

function getRewardAmount(completedCount) {
    if (completedCount >= 1 && completedCount <= 2) {
        return 75;
    } else if (completedCount >= 3 && completedCount <= 4) {
        return 150;
    } else if (completedCount >= 5) {
        return 250;
    } else {
        return 0;
    }
}

function canGetItem(completedCount) {
    if (completedCount >= 3) {
	    return true
    } else {
        return false;
    }
}
-%>
<%*
tp.hooks.on_all_templates_executed(async () =>
	{
		const file = tp.file.find_tfile(tp.file.path(true));
		await app.fileManager.processFrontMatter(file, (frontmatter) =>
		{ 
			frontmatter["amount"] = amount;
			if (can_get_item) {
				frontmatter["choice"] = "Toy | Bank | Experience";
				frontmatter["cost"] = "";
				frontmatter["item"] = "";
				frontmatter["link"] = "";
			}
		}); 
	});
-%>
