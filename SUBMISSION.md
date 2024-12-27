# TODO

Hello, here are the steps to follow until the test is finished.

1 - Firstly, I ran the project following the read-me documentation
2 - I read the proposal for the task described in the readme
3 - I navigated between the folders to understand the component structure

I focused more on observing the structure of the app folder, where it contained all the code that I need to act on.
Analyzing the API documentation, I identified that there was an endpoint “vehicle.options” where it would be useful to bring all the filter information, as instructed in the readme.

Having done this, I identified a component called “AdditionalFilters.tsx” which was the ideal component to assemble my filter.

I started making the endpoint call with trpc and the data initially came through correctly.

I started assembling the filter's HTML with mock data so I could visualize it on the front.

I identified that react-hook-form was being used, which made it easier to retrieve information from the calendar form via “useFormContext”, then I identified that no “form.tsx” file had a global form interface, where I will use this data to send to the filter API.

That was perfect, now it worked, just fill the filter form fields with the react hook forms and the “form.watch” configured in the “VehicleList.tsx” component will be loaded to observe changes in these fields and trigger the hook that searches for these information in the API.

Perfect, that was it
Now all we had to do was create an HTML card with flex box using tailwindcss and our card looks cool.