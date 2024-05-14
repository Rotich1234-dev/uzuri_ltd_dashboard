

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Create a function to generate the PDF
const ConstructionCompanyReport = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}> Uzuri Limited Company Report</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Executive Summary</Text>
        <Text style={styles.text}>
Executive Report for Uzuri Limited Company
Date of Meeting: March 12, 2024
Time: 2:00 PM - 5:00 PM
Venue: Uzuri Limited Headquarters
Attendees:

Chairperson: Naomi Mogi, CEO, Uzuri Limited
Main Agent Representatives:
Sarah Wanjiku, Head of Pump & Tank Installation
Jane Rotich, Chief Hydrogeologist
Omoding Juma, Lead Designer & Constructor
Diana Tuei, Lead Designer
Eugen Koech, Head of Drilling & Test Pumping
1. Welcome and Introduction
The meeting commenced at 2:00 PM with a welcome address by Naomi Mogi, CEO, Uzuri Limited. The purpose of the meeting was to review and discuss the performance and strategies of the key service areas: Pump & Tank Installation, Hydrogeological Survey & Reports, Design & Construction, and Drilling & Test Pumping.

2. Pump & Tank Installation
Presented by: Sarah Wanjiku, Head of Pump & Tank Installation

Overview of Achievements:

Successful completion of 50 major installations in Q1 2024.
Introduction of new high-efficiency pumps that reduced energy consumption by 15%.
Expanded service coverage to include remote areas.
Challenges:

Supply chain delays affecting the timely availability of parts.
Skilled labor shortages in certain regions.
Future Plans:

Partnering with local technical institutes to train more technicians.
Securing alternative suppliers to mitigate delays.
3. Hydrogeological Survey & Reports
Presented by: Jane Rotich, Chief Hydrogeologist

Overview of Achievements:

Conducted over 100 surveys with a 98% success rate in identifying viable water sources.
Implementation of advanced geophysical survey techniques, improving accuracy by 20%.
Challenges:

Difficulty in accessing certain terrains due to poor infrastructure.
Variability in groundwater quality affecting the consistency of reports.
Future Plans:

Investing in portable survey equipment for difficult terrains.
Collaborating with environmental agencies to enhance water quality monitoring.
4. Design & Construction
Presented by: Omoding Juma, Lead Designer & Constructor

Overview of Achievements:

Completed 30 construction projects, including residential and commercial water systems.
Developed innovative water system designs that integrate renewable energy sources.
Challenges:

Regulatory hurdles slowing down project approvals.
Budget constraints impacting the scale of some projects.
Future Plans:

Establishing a regulatory liaison team to expedite approvals.
Exploring additional funding sources to support larger projects.
5. Drilling & Test Pumping
Presented by: Eugen Koech, Head of Drilling & Test Pumping

Overview of Achievements:

Drilled 40 new boreholes with a high success rate in water yield.
Introduction of state-of-the-art test pumping equipment, reducing testing time by 25%.
Challenges:

Environmental concerns and opposition in certain communities.
High operational costs due to equipment maintenance and fuel.
Future Plans:

Implementing community engagement programs to address environmental concerns.
Investing in more efficient and eco-friendly drilling technologies.
6. Financial Overview
Presented by: CFO, Uzuri Limited

Revenue Breakdown:

Pump & Tank Installation: $2.5 million
Hydrogeological Surveys & Reports: $1.8 million
Design & Construction: $3.0 million
Drilling & Test Pumping: $2.2 million
Total Revenue for Q1 2024: $9.5 million

Profit Margins:

Overall profit margin increased by 10% compared to Q1 2023.
7. Strategic Goals for 2024
Expansion: Target new markets and increase service coverage by 20%.
Innovation: Continue investing in advanced technologies and sustainable practices.
Community Engagement: Enhance community relations and support local development initiatives.
8. Action Items
Training Program: Develop and implement a comprehensive training program for new technicians.
Equipment Investment: Allocate budget for the purchase of portable survey equipment and eco-friendly drilling technologies.
Regulatory Team: Form a dedicated team to handle regulatory approvals and community engagement.
9. Conclusion
Naomi Mogi thanked all participants for their contributions and emphasized the importance of collaboration and innovation in achieving Uzuri Limited's strategic goals. The meeting concluded at 5:00 PM.
          
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Project Overview</Text>
        <Text style={styles.text}>Project 1: Project description;"Petwill  Construction Company is proposing to build a new office building in downtown California. The project will include a new six-story office building with ground-floor retail space, a parking garage, and a public plaza. The building will be designed to be LEED-certified, with sustainable features such as rainwater harvesting, natural lighting, and energy-efficient systems. The project will also include extensive landscaping and public art. The estimated cost of the project is $20 million, and the anticipated completion date is December 2030</Text>
        <Text style={styles.text}>Project 2: Project description ;</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Financial Performance</Text>
        <Text style={styles.text}>Revenue: $1,000,000</Text>
        <Text style={styles.text}>Profit: $100,000</Text>
        <Text style={styles.text}>Loss: $10,000</Text>
      </View>
    </Page>
  </Document>
);

const DownloadPDF = () => (
  <div className="text-center">
    <PDFDownloadLink document={<ConstructionCompanyReport />} fileName="construction_report.pdf">
      {({ blob, url, loading, error }) => (
        <button className={`text-lg font-semibold mb-8 py-2 px-4 bg-blue-500 text-white rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        >
          {loading ? 'Generating PDF...' : 'Download Reports'}
        </button>
      )}
    </PDFDownloadLink>
  </div>
);

export default DownloadPDF;
