- [[#Bank Total]]
- [[#Rules]]
	- [[#Daily Good Boi]]
	- [[#Weekly Completed Goals]]
- [[#Saved Toy Ideas]]
- [[#History of Purchases]]
- [[#All History]]
# Bank Total
```dataviewjs
const results = Array.from(dv.pages('"4 - Rewards/Logs"'))
    .map(page => {
        let amount = 0;
        if (page.choice) {
            if (page.choice === 'Bank') {
                amount += 55;
            } else if (page.choice === 'Toy' && page.cost > 50) {
                amount -= (page.cost - 50);
            } else if (page.choice === 'Experience' && page.cost > 75) {
                amount -= (page.cost - 75);
            }
        }
        return amount;
    })
    .reduce((sum, amount) => sum + amount, 0)

const roundedTotal = parseFloat(results.toFixed(2));
const formattedTotal = `<span class="green">$${roundedTotal.toFixed(2)}</span>`;
dv.paragraph(formattedTotal);
```
# Rules
## Daily Good Boi
 ([[Reward Lottery Qualification]])
- Success Criteria
	- Flip: <span class="green">Heads</span>
	- Roll: <span class="green">10+</span>
- Reward Options:
	- Toy: <span class="green">Option to buy a Toy worth 50$ + banked cash</span>
	- Experience: <span class="green">Book any experience for under 75$ + banked cash</span>
	- Bank: <span class="green">55$ for future wins</span>
		- <span class="yellow">extra cash left over from the 50$ or 75$ does not get banked</span>
## Weekly Completed Goals
- 1-2: <span class="green">75$ Added to Bank</span>
- 3-4:
	- <span class="green">150$ Added to Bank</span>
	- <span class="green">Can Purchase One Toy or Experience</span>
- 5+:
	- <span class="green">250$ Added to Bank</span>
	- <span class="green">Can Purchase One Toy or Experience</span>
# Saved Toy Ideas:
- #### [Amazon Wish List](https://www.amazon.com/hz/wishlist/ls/17FM1WBVFC90K?ref_=list_d_wl_lfu_nav_2)
# History of Purchases
```dataviewjs
dv.list(dv.pages('"4 - Rewards/Logs"')
    .filter(page => page.choice === 'Toy' || page.choice === 'Experience')
    .map(page => {
        // Extracting the date from the file name and creating a link to the file
        const dateLink = `${page.file.link}`;

        // Keeping toy/experience as plain text
        const choiceText = page.choice;

        // Checking if there's a link for the item and creating a link if it exists
        const itemLink = page.item ? `[${page.item}](${page.link})` : page.item;

        // Success span
        let successSpan = '';
		const resultValue = page.flip_result || page.roll_result || '';
		successSpan = `<span class="green">Success: ${resultValue}</span>`;

        // Formatting the output string
        return `${dateLink} - ${successSpan} - ${choiceText} - ${itemLink} - $${page.cost}`;
    }));

```
# All History
```dataviewjs
let bankTotal = 0;
  
let pages = dv.pages('"4 - Rewards/Logs"')

const dateToNumber = (fileName) => {
    const parts = fileName.split('-');
	// Construct a YYYYMMDD formatted string
	const year = parts[0];
	const month = parts[1].padStart(2, '0'); // Ensure two digits
	const day = parts[2].padStart(2, '0'); // Ensure two digits

	return parseInt(year + month + day, 10);
};


dv.list(pages
	.sort(b => dateToNumber(b.file.name))
    .map(page => {
        // Extracting the date from the file name and creating a link to the file
        const dateLink = `[[${page.file.name}]]`;

        let statusSpan = '';
        let choiceText = ''
        let itemLink = ''
        let bankTotalText = ''
        let costText = ''
        
        if (page.choice) {
            if (page.choice === 'Bank') {
                bankTotal += 55;
                bankTotalText = `$${bankTotal}`
            } else {
		        itemLink = page.link ? `[${page.item}](${page.link})` : "page.item";
		        itemLink = itemLink + " - "
            }
            if (page.choice === 'Toy' && page.cost > 50) {
                bankTotal -= (page.cost - 50);
            } else if (page.choice === 'Experience' && page.cost > 75) {
                bankTotal -= (page.cost - 75);
            }
            const resultValue = page.flip_result || page.roll_result || '';
            statusSpan = `<span class="green">Success: ${resultValue}</span> - `;
	        choiceText = page.choice + " - "
	        costText = page.choice === 'Bank' ? '' : `$${page.cost}`;
        } else {
            // No choice indicates a failure
            const resultValue = page.flip_result || page.roll_result || '';
            statusSpan = `<span class="red">Failure: ${resultValue}</span>`;
        }
		const response = [page.file.name, `${dateLink} - ${statusSpan}${choiceText}${itemLink}${costText}${bankTotalText}`]
        return response;
    })
	.sort(b => dateToNumber(b[0]), 'desc')
	.map(b => b[1])
    );
```
