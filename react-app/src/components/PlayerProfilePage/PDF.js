import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const doc = () => (
    <Document>
      <Page wrap>
        <Text render={({ player, totalPages }) => (
          `${player} / ${totalPages}`
        )} fixed />
  
        <View render={({player}) => (
          player&& (
            <View style={{ background: 'red' }}>
              <Text>{player}</Text>
            </View>
          )
        )} />
      </Page>
    </Document>
  );
// const MyDocument = ({singlePlayer}) => {
//     return singlePlayer ? (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>{singlePlayer.first_name}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// ): (
//     <Document>
//         <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>section</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//     </Document>
// )};
export default doc;