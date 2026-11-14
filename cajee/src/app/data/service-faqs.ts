import type { Faq } from "../components/FaqSection";

// Written against verified sources; anything that could not be checked against an
// openable source was deliberately left out rather than estimated.


// Shared across every service: the practice is private and does not bill schemes
// directly. Defined once so the wording (and its FAQ schema) can never drift
// between service pages.
export const privatePracticeFaq: Faq = {
  q: "Is this a private practice, and how does payment work?",
  a: "Yes. Farida Cajee-Botes is a private orthotic and prosthetic practice, and we do not bill medical schemes directly. Accounts are settled in full at the time of your assessment or on collection of your device, and we give you a detailed invoice with the appropriate codes so you can submit the claim to your medical aid and be reimbursed directly by them. Where it helps your claim, we prepare the itemised quotation, clinical motivation and pre-authorisation paperwork before anything is ordered. What your scheme pays back depends on your plan and available benefits, and that decision rests with the scheme, so any amount they do not cover remains payable by you.",
};

export const prostheticsFaqs: Faq[] = [
  {
    q: "Where can I see a prosthetist in Johannesburg?",
    a: "At the consulting rooms at Orthocast Morningside, 173 Rivonia Road, Sandton, by appointment: phone 011 883 9100. If getting there is the hard part, Farida Cajee-Botes also sees patients at home or in hospital across Johannesburg, Sandton, Midrand, Centurion and Pretoria: call or WhatsApp 079 998 2203 to arrange a visit.",
  },
  {
    q: "How much does a prosthetic leg or arm cost in South Africa?",
    a: "There is no fixed price for a prosthetic leg, and any website quoting a single figure is guessing. Cost is driven by two things: the socket, which is custom made to your residual limb and carries most of the clinical time, and the componentry bought in from manufacturers, chiefly the foot and, for an above-knee limb, the knee joint. [Össur South Africa](https://www.ossur.com/en-za/prosthetics/information/financial-considerations) makes the same point, that there is no standard residual limb and therefore no standard price. An above-knee prosthesis costs more than a below-knee one because a knee is added to the build. We quote in writing, itemised, after assessing you and before anything is ordered. A prosthetic arm is priced the same way: it is built around a socket moulded to you, with the hand and other parts chosen for the tasks you need, so it is also quoted in writing after an assessment.",
  },
  {
    q: "Does medical aid cover a prosthetic leg?",
    a: "Most South African medical schemes contribute towards a prosthetic limb, but few cover the full cost of an advanced build. Cover usually comes from an annual external appliance or external prosthesis benefit with its own rand limit. The [South African Orthotic and Prosthetic Association](https://saopa.co.za/reimbursement/) reports those limits ranging from roughly R3,000 to R55,000 depending on scheme and plan, excluding ex gratia and Prescribed Minimum Benefit funding, and notes that amputation sits on the PMB list, which can unlock funding outside the annual limit. Feedback on a PMB application is usually given within 60 days ([Össur South Africa](https://www.ossur.com/en-za/prosthetics/information/financial-considerations)), but a 2025 study of the private sector found the use of PMBs inconsistent and confusing ([Canadian Prosthetics & Orthotics Journal](https://pmc.ncbi.nlm.nih.gov/articles/PMC11844759/)), so we prepare the clinical motivation, coding and itemised quotation before anything is ordered.",
  },
  privatePracticeFaq,
  {
    q: "How do I get a prosthetic leg for free in South Africa?",
    a: "Through the state system, by referral rather than by walking in. Our article on [getting a prosthetic leg without medical aid](/blog/prosthetic-leg-no-medical-aid-south-africa) sets out the routes. Be realistic about the wait. A 2025 study of state prosthetic services in the Eastern Cape reported users waiting three to four years to be measured, with fewer than half of the province's orthotic and prosthetic posts filled ([African Journal of Disability](https://www.scielo.org.za/scielo.php?pid=S2226-72202025000100096&script=sci_arttext)). If your limb loss followed a road accident or a workplace injury, the Road Accident Fund and COIDA are separate routes worth checking first.",
  },
  {
    q: "Can I just buy a prosthetic leg online?",
    a: "No, because the part that makes a prosthesis work cannot be bought off a shelf. The socket is moulded to your residual limb, and almost all of the comfort, control and skin safety comes from it. Feet, knees and hands are bought in from manufacturers, but they still have to be chosen and aligned to you. What you can sensibly buy yourself are the consumables: prosthetic socks in different plies, shrinkers and skin care. Sock ply is meant to change as your limb volume changes through the day, so keeping your own stock of socks is normal practice rather than something that needs an appointment.",
  },
  {
    q: "How long after an amputation can I get my prosthetic leg?",
    a: "Usually two to six months after surgery, and some people have a temporary limb before that. The [Amputee Coalition](https://amputee-coalition.org/resources/prosthetic-faqs-for-the-new-amputee/) says fitting usually begins two to six months after surgery, once the incision has healed completely and the swelling has come down, and that some people receive a temporary prosthesis straight after the amputation or within two to three weeks. The limb keeps changing for far longer: the [Merck Manual](https://www.merckmanuals.com/home/special-subjects/limb-prosthetics/residual-limb-swelling) notes that a residual limb matures 18 to 24 months after surgery. So the date is set by how your limb heals, not by a calendar. We assess in hospital or at home when travelling is not yet realistic.",
  },
  {
    q: "My prosthetic leg is rubbing and sore. Is that normal?",
    a: "No. Rubbing and soreness mean the fit needs attention, not perseverance. The [Merck Manual](https://www.merckmanuals.com/home/special-subjects/limb-prosthetics/skin-care-of-the-residual-limb) is blunt about it: pain is the first indication of a problem, the prosthesis should come off so the skin can be inspected, and continuing to wear it causes more serious skin damage and can lead to infection. Check your skin at least once a day, and several times a day if diabetes or neuropathy has dulled your sensation. Some daily change in limb volume is normal, and adding or removing a sock ply is the first thing to try. If that no longer settles it, the socket needs adjusting or remaking.",
  },
  {
    q: "Is a bionic hand better than a hook or a basic prosthetic hand?",
    a: "Not automatically, and the evidence does not show a myoelectric hand being kept markedly more often than a simpler one. A 2007 review found adult rejection rates of 23% for electrically powered arms and 26% for body-powered ones ([Prosthetics and Orthotics International, via PubMed](https://pubmed.ncbi.nlm.nih.gov/17979010/)), so the expensive option is not markedly more likely to be kept. A 2023 study in [PLOS One](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0289978) found that commercially available multi-grip hands scored poorly on how intuitive they were to control, and that a simple body-powered solution outperformed more advanced systems in Cybathlon competition. It names lack of function, control complexity and discomfort among the reasons devices get abandoned. Choose against the tasks you actually need to do at work and at home.",
  },
  {
    q: "How often does a prosthetic leg need to be replaced?",
    a: "Plan on roughly five years for the mechanical components, and sooner for a growing child. [Össur South Africa](https://www.ossur.com/en-za/prosthetics/information/financial-considerations) states that you can expect to replace the mechanical components approximately every five years, and the [South African Orthotic and Prosthetic Association](https://saopa.co.za/reimbursement/) notes that the Road Accident Fund will generally only pay for a new prosthesis once every five years. The [Amputee Coalition](https://amputee-coalition.org/resources/prosthetic-faqs-for-the-new-amputee/) is more cautious, putting the working life of a prosthesis at anywhere from several months to several years depending on age, activity level and growth. As the limb changes shape and size, the socket fit changes and may need adjusting ([Blesma](https://blesma.org/about-loss-of-limb/nhs-limb-service-and-prosthetic-information/)), and children's prostheses need frequent readjusting or replacing as they grow ([Amputee Coalition](https://amputee-coalition.org/resources/pediatric-limb-loss-and-limb-difference-an-introduction-for-parents/)).",
  },
];

export const customOrthoticsFaqs: Faq[] = [
  {
    q: "How much do custom orthotics cost, and will my medical aid pay?",
    a: "Cost depends entirely on the device, so we quote in writing before anything is made or ordered: a pair of moulded insoles and a custom spinal brace are not comparable jobs. Most South African medical schemes contribute towards orthotic devices from an appliance or external medical items benefit, usually with a prescription or motivation from your doctor. What comes back varies considerably between schemes and between plans on the same scheme, so no one can give you a figure without looking at your specific plan. We supply the clinical motivation and coding your scheme asks for, and confirm your cover before anything is manufactured.",
  },
  {
    q: "Can I just buy insoles from Clicks or Dis-Chem instead of having them made?",
    a: "For ordinary heel pain in an adult, often yes, and we will say so. A 2019 review by Canada's health technology agency found no difference between custom-made and prefabricated foot orthoses for pain or function in adults with plantar heel pain at six weeks, twelve weeks or twelve months, though the evidence was of very low to low quality, and it quoted researchers suggesting clinicians consider a well-contoured shelf insole because it may cost less ([CADTH, via NCBI Bookshelf](https://www.ncbi.nlm.nih.gov/books/NBK549527/)). Try the pharmacy pair first. Custom insoles earn their cost when a shelf shape cannot fit the foot: a rigid deformity, a diabetic foot at risk of ulceration, a genuine leg length difference, or a neurological or post-surgical foot.",
  },
  {
    q: "My child has flat feet. Do they need arch supports?",
    a: "Almost certainly not. [NHS guidance](https://www.nhs.uk/conditions/flat-feet/) is that most children have flat feet when they are young and usually develop arches on the inner side of the foot between three and ten years of age, and that insoles will not change the shape of a foot, though they can help with pain or stiffness. So we treat symptoms, not the look of an arch. Have the feet checked if they are painful, stiff, weak or numb, if only one foot is affected, if your child is struggling with walking or balance, or if the flat foot is new. Otherwise let them run.",
  },
  {
    q: "My child walks on their tiptoes. Do they need a splint?",
    a: "Usually not, and not as the first step. Idiopathic toe walking is seen in around one in twenty toddlers and usually resolves without treatment by the age of five to ten ([NHS paediatric physiotherapy advice](https://www.hacw.nhs.uk/leaflets-paeds-idiopathic-toe-walking/)), and treatment usually starts with stretches and exercises at home, with serial casting only for children whose calf muscles are very tight ([Whittington Health NHS](https://www.whittington.nhs.uk/document.ashx?id=14932)). Get it assessed sooner if the toe walking is on one leg only, if your child cannot get the heels down when asked, if there is pain or frequent falling, or if there was prematurity, speech delay or a family history.",
  },
  {
    q: "My foot drags since my stroke (foot drop). Will an ankle brace or AFO help?",
    a: "An ankle foot orthosis, the moulded brace that holds the foot up so the toes clear the ground as the leg swings through, can help, but only as part of a rehabilitation programme. The UK's [NICE guideline on stroke rehabilitation in adults](https://www.nice.org.uk/guidance/ng236/chapter/Recommendations) says assessment for and treatment with ankle foot orthoses should be carried out as part of a stroke rehabilitation programme and performed by qualified professionals, that your ability to put the brace on must be assessed, and that its effectiveness is judged on comfort and on the speed and ease of walking. If it does not make walking easier, it is the wrong device.",
  },
  {
    q: "Will a back brace straighten my child's scoliosis?",
    a: "No. A scoliosis brace is fitted to stop a curve getting worse while your child is still growing, not to straighten the spine. Bracing is generally considered for curves between about 25 and 45 degrees in a child who is still growing, while curves under 25 degrees are usually monitored with repeat X-rays ([OrthoInfo, American Academy of Orthopaedic Surgeons](https://www.orthoinfo.org/bodypart/back/idiopathic-scoliosis-in-children-and-adolescents/)). In the [BrAIST trial](https://pubmed.ncbi.nlm.nih.gov/24047455/), 72% of braced patients reached skeletal maturity without the curve reaching 50 degrees, against 48% of those observed, with the brace prescribed for at least 18 hours a day. Wear time is directly associated with the result, which is why the fit has to be liveable.",
  },
  {
    q: "Do I need a referral from my doctor to see an orthotist?",
    a: "You can book an assessment with us directly. A referral is not what gets you through the door, but it matters for two other reasons. Your medical aid will usually want a prescription or motivation from a doctor before it contributes towards a device, and for spinal bracing, post-operative devices and anything following surgery we work from the treating surgeon's prescription and report back to them. If you come without a referral and the assessment turns up something that needs a doctor first, we will tell you so, and tell you who to see.",
  },
  {
    q: "Do you fit orthotics at home or in hospital?",
    a: "Yes. Assessment, casting or scanning, fitting and review can all be done at the consulting rooms at Orthocast Morningside in Sandton, at your home, or at a hospital bedside across Johannesburg, Sandton, Midrand, Centurion and Pretoria. For orthotics a home visit is not just convenience: seeing the actual stairs, doorways, floor surfaces and shoes a device has to cope with changes what gets prescribed. The consulting rooms are by appointment only, so please phone 011 883 9100 for a rooms appointment, or 079 998 2203 to arrange a home visit.",
  },
  privatePracticeFaq,
];

export const offTheShelfFaqs: Faq[] = [
  {
    q: "Can I just buy a knee or ankle brace myself at Dis-Chem or Clicks?",
    a: "Often yes, and we will say so plainly when that is the right call. A simple elastic knee sleeve, a wrist support for a mild strain or a compression ankle sleeve for end-of-day puffiness are sold over the counter at Dis-Chem, Clicks and Takealot, and buying one yourself is sensible. Come to us when the problem is bigger than the product: the joint gives way, there is nerve pain or numbness, the limb is a shape the shelf sizes will not fit, you are recovering from surgery, or you already have a drawer of supports that did nothing. We fit at the Morningside rooms by appointment, and at home or at the hospital bedside where travelling is the obstacle.",
  },
  {
    q: "What do braces and supports cost, and will my medical aid pay for one?",
    a: "Prices run from inexpensive elastic sleeves to hinged and post-operative devices that cost a great deal more, so we quote you before anything is ordered. Medical aid cover varies by scheme and by plan. Discovery Health Medical Scheme, as one published example, lists orthotics in its [2026 External Medical Items Benefit](https://www.discovery.co.za/wcm/discoverycoza/assets/medical-aid/benefit-information/2026/external-medical-items-benefit.pdf), funded at 100% of the Discovery Health Rate up to an annual limit that depends on your plan. Which part of your cover pays also depends on the plan, and its Smart Series, Core Series and KeyCare Series plans do not cover them. Other schemes structure it differently, so check yours. We supply the clinical motivation and coding your scheme asks for.",
  },
  {
    q: "What is the difference between an off-the-shelf brace and a custom-made one?",
    a: "An off-the-shelf brace is manufactured in standard sizes and then fitted and adjusted to you, while a custom device is built from a cast, a set of measurements or a scan of your own limb. Ready-made is the right answer far more often than people expect. For most sprains, strains, mild instability and short-term post-operative support, a well-chosen stock brace does the same job, costs less and goes on the same day. Custom becomes necessary when the limb shape is unusual, when the skin cannot tolerate pressure in the wrong place, when correction has to be built into the device, or when nothing off the shelf actually holds.",
  },
  {
    q: "Will a back brace or support belt help my lower back pain?",
    a: "Probably not, and we would rather tell you that than sell you one. The [NICE guideline on low back pain and sciatica in over 16s](https://www.nice.org.uk/guidance/ng59/chapter/Recommendations) says plainly: do not offer belts or corsets for managing low back pain with or without sciatica. The same guideline advises against foot orthotics and rocker sole shoes for back pain too. Movement, exercise and getting back to normal activity do more. There are real exceptions, including certain spinal fractures, post-operative bracing on a surgeon's instruction and some scoliosis management, and those are prescribed for a specific reason. If your back pain comes with leg weakness, numbness or bladder changes, see a doctor rather than buying a belt.",
  },
  {
    q: "Will a knee brace help my arthritis?",
    a: "Not routinely, and that is the guideline position rather than our opinion. [NICE guidance on osteoarthritis](https://www.nice.org.uk/guidance/ng226/chapter/Recommendations) says not to routinely offer insoles, braces, tape, splints or supports unless there is joint instability or abnormal loading, therapeutic exercise alone is not working or is unsuitable, and the device is likely to improve your movement and function. Exercise, weight management and a walking stick where it helps come first. A brace is worth assessing when the knee genuinely buckles or gives way under you. Fit matters more than brand here, because the committee behind the same guidance noted a potential risk of blistering and other pressure damage from these devices ([NICE](https://www.nice.org.uk/guidance/ng226/chapter/Rationale-and-impact)).",
  },
  {
    q: "My hand goes numb at night. Will a wrist splint help?",
    a: "A night wrist splint is a reasonable first step for mild carpal tunnel syndrome, and it is one of the few supports you can sensibly buy for yourself. It holds the wrist near neutral so it cannot curl while you sleep, which is why the symptoms wake you. Be realistic about what it does. The [NHS](https://www.nhs.uk/conditions/carpal-tunnel-syndrome/) says you may need to wear a splint for up to six weeks before it starts to feel better, the evidence that night splints help is limited and of low certainty ([Cochrane review, via PubMed](https://pubmed.ncbi.nlm.nih.gov/36848651/)), and for some people a splint does not help. Get the diagnosis confirmed first: numbness in the hand also comes from the neck and the elbow, and a splint on the wrong problem wastes weeks.",
  },
  {
    q: "Should I wear a neck collar after whiplash from a car accident?",
    a: "Usually not. The [NHS](https://www.nhs.uk/conditions/whiplash/) advises against resting your neck for long periods and says a neck brace or collar does not help. Carrying on with everyday activities might hurt a little, but the NHS says it will speed up your recovery. Rigid collars are a separate matter: they are used after specific fractures and spinal surgery, on a doctor's instruction, and are not something to buy for a sore neck. If you have arm weakness, numbness or severe pain after a crash, get assessed properly.",
  },
  {
    q: "How long do I wear an ankle brace after a sprain, and will it weaken the joint?",
    a: "A brace after an ankle sprain is there to let you move safely, not to keep the ankle still, and it is worn while you rebuild strength rather than indefinitely. The evidence favours functional treatment, meaning support plus early movement, over immobilisation: an earlier return to work and sport, less persistent swelling, less joint instability and better range of motion ([Archives of Orthopaedic and Trauma Surgery, via PubMed](https://pubmed.ncbi.nlm.nih.gov/11550833/)). That is also the answer to the weakening worry, because a brace used alongside proper rehabilitation does not do the muscles' job for them. If you have sprained the same ankle before, a brace has strong evidence for preventing the next one ([British Journal of Sports Medicine, via PubMed](https://pubmed.ncbi.nlm.nih.gov/28053200/)).",
  },
  privatePracticeFaq,
];

export const mobilityAidsFaqs: Faq[] = [
  {
    q: "Can I just buy a wheelchair or crutches myself?",
    a: "For short-term use, buy them yourself and do not pay anyone to assess you. A pair of crutches after an ankle fracture, a basic walking frame for the first weeks after a hip replacement, or a folding wheelchair for the occasional outing are all sold over the counter without a prescription. [Dis-Chem](https://www.dischem.co.za/shop-by-department/health-and-wellness/homecare/mobility) lists crutches, walking sticks, walking frames, rollators and folding wheelchairs online. Ask the physiotherapist already treating you to set the height. Fitting starts to matter when the chair becomes the seat you live in, when sensation is reduced, when the condition is progressive, or when the user is a growing child.",
  },
  {
    q: "Can I get a free wheelchair in South Africa?",
    a: "Yes, through the state health system, if you qualify for free health care. State hospitals charge for devices on the patient fee schedule, and in the Western Cape's published schedule, for example, assistive devices are free for fully subsidised (H0) patients ([Western Cape Provincial Gazette 8902 of 2024](https://www.westerncape.gov.za/department-premier/files/wcg-blob-files?file=2026-02%2F8902-Extra-Uniform-Patient-Fee-2024.pdf&type=file)). Ask the state hospital or clinic treating you how to be assessed for one. If that is the better route for you, we will say so.",
  },
  {
    q: "Does medical aid pay for a wheelchair, walker or crutches?",
    a: "Most schemes contribute, usually from an appliance or external medical items benefit. Expect two limits: a rand amount for the year, and how often the item may be replaced. Discovery Health Medical Scheme's [2026 external medical items rules](https://www.discovery.co.za/wcm/discoverycoza/assets/medical-aid/benefit-information/2026/external-medical-items-benefit.pdf), for example, fund a wheelchair once every three years for members with a physical disability, a walker once every three years and crutches once a year on the plans that include the benefit, and pay for non-preferred products only up to the Discovery Health Rate, leaving you any shortfall. Cover differs between schemes and between plans on the same scheme, so get your benefit confirmed in writing before anything is ordered.",
  },
  {
    q: "What size wheelchair do I need?",
    a: "Wheelchair size is a set of measurements, not a small, medium or large. Seat width is measured across the hips, or the widest part of the thighs, while seated, and the seat should be as close to that width as possible but never narrower, so your fingers fit between your thighs and the sides of the chair without being pinched ([WHO wheelchair service training](https://www.who.int/publications/i/item/9789241503471)). Seat depth runs from the back of the hip to just short of the knee, so the seat cannot dig in behind the knee. Seat height is set so the footplates clear the floor. A chair that is too wide is harder to push, harder to get through a doorway, and supports posture poorly.",
  },
  {
    q: "Do I need a special wheelchair cushion, or is the standard one fine?",
    a: "If you sit in the chair for most of the day and are at high risk of pressure injuries, you need a pressure redistributing cushion. The [international pressure injury guideline](https://www.internationalguideline.com/s/CPG2019edition-digital-Nov2023version.pdf) recommends a pressure redistribution cushion for people at high risk who sit for long periods, and says not to use ring or doughnut shaped devices, because their edges create areas of high pressure. The cushion is matched to your dimensions, your posture and whether sensation is intact. No cushion replaces movement: the same guideline asks people who sit for long periods to shift their weight regularly. If your shape, posture or ability changes, the seating needs looking at again.",
  },
  {
    q: "Should I get a walking frame (walker) or a rollator?",
    a: "A walking frame gives more stability, a rollator covers more ground. A standard frame is lifted and placed with each step, which is slow but very stable, and suits short indoor distances and the early weeks after surgery. A rollator rolls on wheels, has hand brakes and usually a seat, and suits walking outdoors, shopping, and anyone who needs somewhere to rest along the way. Choose for where the walking actually happens. One rule covers both: never haul yourself up out of a chair by the frame. Push up off the chair arms first, then take the handles.",
  },
  {
    q: "How do I know if my crutches or walking stick are the right height?",
    a: "The handle should sit level with the crease of your wrist when you stand upright with your arm hanging at your side, so your elbow is slightly bent at the grip ([OrthoInfo, American Academy of Orthopaedic Surgeons](https://www.orthoinfo.org/treatment/nonsurgical-treatments/how-to-use-crutches-canes-and-walkers/)). On underarm crutches, the top pad sits about 2.5 to 5 centimetres below the armpit, and your hands, not your armpits, carry your weight, because leaning on the pads can injure the radial nerve in the armpit ([Merck Manual](https://www.merckmanuals.com/professional/injuries-poisoning/how-to-do-casting-procedures/how-to-fit-and-walk-with-underarm-crutches)). A walking stick goes in the hand opposite the sore leg, not the same side.",
  },
  {
    q: "Do you come to the house, or do we have to bring my father in?",
    a: "We come to you. Mobility equipment is assessed where it will be used, so home visits are the normal way we work across Centurion, Pretoria, Midrand, Sandton and Johannesburg, and we see patients at the hospital bedside before discharge. Doorway widths, the height of the bed and the toilet, the step at the front door and the surface underfoot all change which device is right, and none of it is visible in a consulting room. Consulting rooms in Morningside, Sandton are available by appointment if you would rather come in.",
  },
  privatePracticeFaq,
];

export const breastProsthesesFaqs: Faq[] = [
  {
    q: "How soon after my mastectomy can I wear a breast form?",
    a: "A soft fabric form, sometimes called a comfie or a softie, is usually worn for the first few weeks after surgery, and a silicone prosthesis usually within six to eight weeks, once the wound has healed ([Breast Cancer Now](https://breastcancernow.org/about-breast-cancer/life-after-treatment/your-body-after-breast-cancer-treatment/breast-prosthesis/types-of-breast-prosthesis)). [Cancer Research UK](https://www.cancerresearchuk.org/about-cancer/breast-cancer/treatment/surgery/after-surgery/false-breast-shape) puts the permanent fitting at about six weeks after surgery, once your scar has healed and you have finished any radiotherapy. The soft form is light and does not press on the scar. If your chest is still swollen after radiotherapy, you may prefer to wait until the swelling settles, because a form fitted to a swollen chest will not fit the chest you end up with. Your surgeon or breast care nurse has the final say on timing.",
  },
  {
    q: "How much does a breast prosthesis cost, and does medical aid pay for it?",
    a: "Prices vary widely by type, so we quote you before anything is ordered or made. A soft post-surgical form is inexpensive, a standard silicone form costs more, and a custom silicone prosthesis made to your own contour costs more again. Many medical schemes contribute towards an external breast prosthesis and mastectomy bras from a prosthesis or external medical items benefit, usually with a prescription or motivation, though cover differs between schemes and plans. If you are not on a scheme, [Reach for Recovery](https://www.reach4recovery.org.za/our-work/)'s Ditto Project supplies silicone prostheses to state patients where funds permit, and [CANSA](https://cansa.org.za/cansas-care-support/breast-prostheses-bras/) distributes free hand-knitted forms through its care centres.",
  },
  {
    q: "Can I just buy a breast form online myself?",
    a: "Yes, and for many women that is a perfectly sensible choice. If you had a straightforward single mastectomy, you know your bra size, your chest is fully healed and you are matching a fairly standard shape, an off-the-shelf silicone form from a reputable supplier will do the job and you do not need us for it. Come to us when the standard forms do not work: a very uneven chest, a partial or reconstructed breast, skin changed by radiotherapy, a form that keeps riding up, or when you want a nipple prosthesis or a custom silicone form. Buying twice costs more than being measured once.",
  },
  {
    q: "Do I need a special mastectomy bra?",
    a: "Not always, but the bra matters more than most women expect. A prosthesis only sits correctly if something holds it against the chest wall, so a well fitting bra with a firm band and a full cup does most of the work. Mastectomy bras have sewn-in pockets that stop the form shifting, and [Cancer Research UK](https://www.cancerresearchuk.org/about-cancer/breast-cancer/treatment/surgery/after-surgery/false-breast-shape) notes you can also have a pocket stitched into a bra you already own. If your current bras fit properly and hold the form still, keep them. If the form slides, rides up or you are forever adjusting it, the bra is usually the problem, not the form.",
  },
  {
    q: "I had a lumpectomy, not a mastectomy. Is there anything for me?",
    a: "Yes. A partial form, also called a shaper or a shell, fills the dip left after a lumpectomy or after radiotherapy has shrunk the breast, so both sides sit level under clothing. These are small silicone or foam pieces shaped to sit over the top, the outer side or the underside of the breast, and they go into an ordinary bra or a pocketed one. Partial forms are the most commonly missed option after breast conserving surgery, largely because nobody mentions them. They are also used after reconstruction, when one side has ended up smaller than the other.",
  },
  {
    q: "Will a silicone form be too heavy? My neck and shoulder already ache.",
    a: "Lightweight silicone forms exist for exactly this reason, and they are worth asking about if you have lymphoedema, osteoporosis, sensitive skin or ongoing neck and shoulder pain. One widely sold lightweight range, [Amoena's Natura Xtra Light](https://www.amoena.com/global/about-us/natura-xtra-light/), is described by its manufacturer as nearly 40% lighter than comparable silicone forms. Be careful of the claim you will read everywhere that a weight-matched form protects your posture. A 2017 study measuring lower back muscle activity in women after mastectomy found that, in most of the movements tested, that activity was not linked to the weight of the prosthesis ([BioMed Research International, via PubMed](https://pubmed.ncbi.nlm.nih.gov/29147663/)). What weight does affect is how the form sits, whether it stays level with the other side, and whether you will wear it all day.",
  },
  {
    q: "How long does a breast form last and how do I look after it?",
    a: "Cared for properly, a silicone form can last several years, usually longer than its guarantee ([Breast Cancer Now](https://breastcancernow.org/media-assets/ul1fbeev/bcc123-breast-prostheses-bras-and-clothes-web-pdf.pdf)). [Amoena](https://www.amoena.com/ca-en/about-us/amoena-breast-form-warranty/), for example, warrants its forms for two years unless noted otherwise. Wash it daily in warm soapy water and dry it with a towel, store it in the shaped tray inside its box, and keep it away from rings, pins, pet claws and anything sharp. Amoena advises keeping talcum powder and body lotion off the form ([Amoena](https://www.amoena.com/ca-en/about-us/breast-form-care-instructions/)). You can swim in a standard form if you rinse it in clean water afterwards, to avoid any possible damage from chlorine or salt water. Dedicated swim forms are made for this.",
  },
  {
    q: "Can I be fitted at home instead of coming in?",
    a: "Yes. Fittings are done at the consulting rooms in Morningside, Sandton, at your home, or at your hospital bedside across Johannesburg, Sandton, Midrand, Centurion and Pretoria. A first fitting means undressing to the waist in front of a stranger, at a point when you may not yet want to look at your own chest, so many women prefer their own bedroom, their own mirror and their own bras to try against. Appointments are private and unhurried, and you are welcome to bring someone with you. Bring the bras you actually wear every day, not the good one.",
  },
  privatePracticeFaq,
];
