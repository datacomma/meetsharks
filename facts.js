// Short field notes; each source link invites further reading.
const sharkFacts = [
['Follow your nose', 'Sharks use their sense of smell to find food. Water flows through their nostrils, carrying chemical clues from the ocean.'],
['A moment to rest', 'Some sharks can breathe while resting. Others need to keep swimming to move water over their gills.'],
['Built to swim', 'Sharks have no swim bladder. Their oily liver helps with buoyancy, and their fins help them move through the water.'],
['Flexible by nature', 'A shark’s skeleton is made of cartilage—the flexible material in your nose and ears.'],
['Breathing underwater', 'Sharks take oxygen from water using their gills. You can see the gill slits along the sides of their heads.'],
['Skin with tiny teeth', 'Shark skin is covered in tiny tooth-like scales called dermal denticles. They give it a sandpaper-like texture.'],
['An electric sense', 'Special pores around a shark’s head detect weak electric fields. These help it find nearby prey, even when the prey is hidden.'],
['A varied menu', 'Different sharks eat different foods, from fish and shellfish to plankton. Humans are not a normal part of their diet.'],
['Teeth for the job', 'Pointed teeth grip slippery fish. Broad, serrated teeth cut larger prey. Flattened teeth crush hard shells.'],
['Life in an egg case', 'Some sharks lay eggs inside protective cases. A yolk feeds the growing pup until it is ready to hatch.'],
['A connection to mum', 'In some sharks, pups develop inside their mother and receive nourishment through a placenta-like connection.'],
['Hatching on the inside', 'Other sharks hatch from eggs inside their mother. The developing pups feed on yolk before being born.'],
['Growing takes time', 'Many sharks grow slowly, mature late and have relatively few pups. This can make it difficult for populations to recover from overfishing.'],
['More than one beginning', 'Shark families begin in different ways. Swell sharks lay eggs; lemon sharks give birth to live young.'],
['Survival before birth', 'Sand tiger shark embryos can eat other embryos in the womb. This unusual behaviour helps explain their small litters.'],
['Older than dinosaurs', 'Sharks have a fossil history stretching back more than 400 million years. They were swimming long before dinosaurs appeared.'],
['A place in the ocean', 'Sharks are part of marine food webs. Protecting them also means protecting the habitats and other animals they depend on.'],
['Resting on the seabed', 'Nurse sharks can pump water over their gills while resting. Not every shark needs to swim all the time.']
].map(([title, body]) => ({title, body, source:'https://www.floridamuseum.ufl.edu/discover-fish/sharks/'}));
[1,3,4,5,6,15,17].forEach(i => sharkFacts[i].source = 'https://www.fisheries.noaa.gov/feature-story/12-shark-facts-may-surprise-you');
[0,2,9,10,11,14].forEach(i => sharkFacts[i].source = 'https://www.floridamuseum.ufl.edu/discover-fish/sharks/shark-biology/');
sharkFacts[13].source = 'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/lemon-shark/';
const oceanFacts = {
trash:{title:'Less plastic, healthier seas',body:'Ocean currents gather floating debris into large areas. These are scattered patches of rubbish, not solid islands. Using less disposable plastic helps keep it out of the ocean.',source:'https://marinedebris.noaa.gov/discover-marine-debris/garbage-patches'},
wreck:{title:'A wreck becomes a reef',body:'A sunken ship can become a home for marine life. Algae and small animals settle on its surfaces, attracting fish—and the predators that follow them.',source:'https://oceanservice.noaa.gov/facts/artificial-reef.html'}
};
