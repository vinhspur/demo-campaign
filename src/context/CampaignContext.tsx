import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  campaign: Campaign | null;
  setCampaign: (campaign: Campaign) => void;
  handleSubmit: () => void;
  handleAddSubCampaign: () => void;
  idSubCampaignActive: number | null;
  setIdSubCampaignActive: (id: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
console.log("UserContext", UserContext);

type UserProviderProps = {
  children: ReactNode;
};

type Campaign = {
  information: {
    name: string;
    describe?: string;
  };
  subCampaigns: Array<{
    name: string;
    status: boolean;
    ads: Array<{
      name: string;
      quantity: number;
    }>;
  }>;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [campaign, setCampaign] = useState<Campaign | null>({
    information: {
      name: "",
      describe: "",
    },
    subCampaigns: [
      {
        name: "Chiến dịch con 1",
        status: true,
        ads: [
          {
            name: "Quảng cáo 1",
            quantity: 0,
          },
        ],
      },
    ],
  });
  const [idSubCampaignActive, setIdSubCampaignActive] = useState(0);

  const handleValidateAdvertise = (subCampaigns: any) => {
    debugger;

    // check validate
    for (let i = 0; i < subCampaigns.length; i++) {
      if (!subCampaigns[i]?.name) {
        alert(`nhập thiếu thông tin chiến dịch con thứ ${i + 1}`);
        return;
      }
      for (let j = 0; j < subCampaigns[i]?.ads.length; j++) {
        if (
          !subCampaigns[i]?.ads[j]?.name ||
          !subCampaigns[i]?.ads[j]?.quantity
        ) {
          alert(
            `nhập thiếu thông tin quảng cáo thứ ${j + 1} của chiến dịch thứ ${
              i + 1
            }`
          );
          return;
        }
      }
    }
    alert("nhập  thông tin thành công");
  };

  const handleSubmit = () => {
    if (!campaign?.information?.name) {
      alert("Vui lòng nhập tên chiến dịch");
      return;
    }
    handleValidateAdvertise(campaign?.subCampaigns);
  };

  const handleAddSubCampaign = () => {
    setCampaign({
      ...campaign!,
      subCampaigns: [
        ...campaign?.subCampaigns!,
        {
          name: `Chiến dịch con ${campaign?.subCampaigns?.length! + 1}`,
          status: true,
          ads: [
            {
              name: "Quảng cáo 1",
              quantity: 0,
            },
          ],
        },
      ],
    });
  };

  return (
    <UserContext.Provider
      value={{
        campaign,
        setCampaign,
        handleSubmit,
        handleAddSubCampaign,
        idSubCampaignActive,
        setIdSubCampaignActive,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCampaign = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useCampaign must be used within a UserProvider");
  }
  return context;
};
