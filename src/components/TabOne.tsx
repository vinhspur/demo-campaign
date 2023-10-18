import TextField from "@mui/material/TextField";
import { useCampaign } from "../context/CampaignContext";
function TabOne() {
  const { campaign, setCampaign } = useCampaign();

  const handleChangeInfo = (field: string, value: string) => {
    if (field === "name") {
      setCampaign({
        ...campaign!,
        information: {
          ...campaign?.information,
          [field]: value,
        },
      });
    }
  };
  return (
    <>
      <TextField
        onChange={(e) => handleChangeInfo("name", e.target.value)}
        fullWidth
        label="Tên chiến dịch *"
        variant="standard"
      />
      <TextField
        onChange={(e) => handleChangeInfo("describe", e.target.value)}
        fullWidth
        label="Mô tả"
        variant="standard"
      />
    </>
  );
}

export default TabOne;
