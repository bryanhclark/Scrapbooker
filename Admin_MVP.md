# Gathr.io MVP

### Synopsis
Gathr.io (working title) is progressive web app that helps people share photos/text blurbs and create collaborative online scrapbooks.  

### As an Event Organizer ...
  * ... I should be able to create an account, login, and logoff. 
  * ... create an event with a name, start time and end time. 
  * ... add participants to an event and save their phone numbers to facilitate participation during and after the event. 

### As an Event Participant ... 
• ... receive SMS prompts as the event begins, the event ends to facilitate photo selects, and when the scrapbook is ready to view. 
• ... add text-based content to the event scrapbook.
• ... upload photo selects from mobile phone to event scrapbook (see Photo Selects workflow)
• ... view finished scrapbook on desktop/tablet.

### Photo Selects workflow
• ... participant can review their photos on their smartphone from the event.
• ... participant can select photos and submit.
• ... photos transformed to base 64 for transmission to Amazon S3.
• ... photos are stored in an S3 bucket for the corresponding event.
• ... image URLs and participant/event IDs are saved in database.

### Scrapbook workflow
• ... photos/text blurbs are added to the scrapbook as they are available and displayed via D3. 
• ... develop algorithm to manage how image data is displayed.
