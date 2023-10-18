import { Button, Typography } from "@mui/material";
import { useCampaign } from "../context/CampaignContext";

const Header = () => {
  const { handleSubmit } = useCampaign();

  return (
    <>
      <Button
        onClick={handleSubmit}
        style={{ float: "right" }}
        variant="contained"
      >
        SUBMIT
      </Button>
      <Typography style={{ float: "right", marginRight: 12 }}>
        DEMO - Nguyễn Văn Vinh
      </Typography>
    </>
  );
};

export default Header;
