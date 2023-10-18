import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useCampaign } from "../../context/CampaignContext";

type Ads = {
  name: string;
  quantity: number;
};

function Campaign() {
  const {
    campaign,
    setCampaign,
    handleAddSubCampaign,
    idSubCampaignActive,
    setIdSubCampaignActive,
  } = useCampaign();

  console.log("campaign", campaign);

  const handleCountAds = (ads: Ads[]) => {
    debugger;
    let numberAds = 0;
    ads?.forEach((item) => {
      numberAds += item.quantity;
    });
    return numberAds;
  };

  const handleActiveCampaign = (index: number) => {
    setIdSubCampaignActive(index);
  };

  const handleChangeNameSubCampaign = (value: string) => {
    const newSubCampaign = campaign?.subCampaigns?.map((item, index) => {
      return index === idSubCampaignActive ? { ...item, name: value } : item;
    });
    setCampaign({
      ...campaign!,
      subCampaigns: newSubCampaign!,
    });
  };

  const handleCheckboxChange = (isChecked: boolean) => {
    const newSubCampaign = campaign?.subCampaigns?.map((item, index) => {
      return index === idSubCampaignActive
        ? { ...item, status: isChecked }
        : item;
    });
    setCampaign({
      ...campaign!,
      subCampaigns: newSubCampaign!,
    });
  };

  return (
    <>
      <Box marginBottom={8}>
        <Button
          style={{ marginBottom: 24 }}
          variant="contained"
          onClick={handleAddSubCampaign}
        >
          Thêm Chiến Dịch Con
        </Button>
        <Box display={"flex"} columnGap={2}>
          {campaign?.subCampaigns?.map((item, index) => {
            return (
              <Box
                style={{
                  border:
                    index === idSubCampaignActive
                      ? "2px solid #1976d2"
                      : "2px solid rgb(250, 250, 250)",
                  borderRadius: 12,
                  width: 200,
                  height: 70,
                  padding: 8,
                  textAlign: "center",
                }}
                onClick={() => handleActiveCampaign(index)}
              >
                <Typography fontWeight={600} fontSize={18}>
                  {item?.name}
                </Typography>
                <Typography fontWeight={600} fontSize={18}>
                  Quảng cáo : {handleCountAds(item.ads)}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          style={{ marginTop: 24 }}
          columnGap={2}
        >
          <TextField
            value={campaign?.subCampaigns[idSubCampaignActive!]?.name}
            fullWidth
            label="Tên chiến dịch con *"
            variant="outlined"
            onChange={(e) => {
              handleChangeNameSubCampaign(e.target.value);
            }}
          />
          <FormControlLabel
            style={{ minWidth: "20vw" }}
            control={
              <Checkbox
                checked={campaign?.subCampaigns[idSubCampaignActive!]?.status}
                onChange={(event) => handleCheckboxChange(event.target.checked)}
              />
            }
            label="Đang hoạt động"
          />
        </Box>
      </Box>
    </>
  );
}

export default Campaign;
