import React, { useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import CustomTabPanel from "./components/CustomTabPanel";
import TabOne from "./components/TabOne";
import TabTwo from "./components/TabTwo";
import { UserProvider } from "./context/CampaignContext";
import Header from "./components/Header";

function App() {
  const [value, setValue] = useState(0);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <UserProvider>
      <Box sx={{ width: "90%", margin: "24px auto" }}>
        <Header />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="THÔNG TIN" {...a11yProps(0)} />
            <Tab label="CHIẾN DỊCH CON" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TabOne />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TabTwo />
        </CustomTabPanel>
      </Box>
    </UserProvider>
  );
}

export default App;
