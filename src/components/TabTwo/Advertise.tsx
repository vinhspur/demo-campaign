import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCampaign } from "../../context/CampaignContext";

type Ads = {
  name: string;
  quantity: number;
};

function Advertise() {
  const { campaign, setCampaign, idSubCampaignActive } = useCampaign();

  const handleAddAdvertise = () => {
    const newSubCampaign = campaign?.subCampaigns?.map((item, index) => {
      if (index === idSubCampaignActive) {
        return {
          ...item,
          ads: [
            ...item?.ads,
            {
              name: `Quảng cáo ${item?.ads?.length + 1}`,
              quantity: 0,
            },
          ],
        };
      } else {
        return item;
      }
    });
    setCampaign({
      ...campaign!,
      subCampaigns: newSubCampaign!,
    });
  };

  const handleDeleteAdsByIndex = (ads: Ads[], index: number) => {
    return ads?.filter((_, i) => {
      return i !== index;
    });
  };

  const handleDeleteAds = (index: number) => {
    const newSubCampaign = campaign?.subCampaigns?.map((item, i) => {
      if (i === idSubCampaignActive) {
        return {
          ...item,
          ads: handleDeleteAdsByIndex(item?.ads, index),
        };
      } else {
        return item;
      }
    });
    setCampaign({
      ...campaign!,
      subCampaigns: newSubCampaign!,
    });
  };

  const handleChangeValueAds = (
    ads: Ads[],
    value: any,
    field: string,
    indexChangeAds: number
  ) => {
    return ads?.map((item, index) => {
      return index === indexChangeAds
        ? { ...item, [field]: field === "name" ? value : Number(value) }
        : item;
    });
  };

  const handleChangeAdvertise = (
    value: any,
    field: string,
    indexChangeAds: number
  ) => {
    const newSubCampaign = campaign?.subCampaigns?.map((item, index) => {
      if (index === idSubCampaignActive) {
        return {
          ...item,
          ads: handleChangeValueAds(item?.ads, value, field, indexChangeAds),
        };
      } else {
        return item;
      }
    });
    setCampaign({
      ...campaign!,
      subCampaigns: newSubCampaign!,
    });
  };

  return (
    <>
      <Typography>DANH SÁCH QUẢNG CÁO</Typography>
      <div style={{ height: 400, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Tên quảng cáo *</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Số lượng *</Typography>
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={handleAddAdvertise}>
                    Thêm
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaign?.subCampaigns[idSubCampaignActive!]?.ads?.map(
                (item, index) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <TextField
                          required
                          value={item?.name}
                          variant="standard"
                          fullWidth
                          onChange={(e) =>
                            handleChangeAdvertise(e.target.value, "name", index)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          required
                          value={item?.quantity}
                          variant="standard"
                          type="number"
                          fullWidth
                          onChange={(e) =>
                            handleChangeAdvertise(
                              e.target.value,
                              "quantity",
                              index
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          onClick={() => {
                            handleDeleteAds(index);
                          }}
                        ></DeleteIcon>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Advertise;
