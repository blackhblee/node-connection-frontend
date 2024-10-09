"use client";

import useInput from "@/app/_hooks/useInput";
import useTextarea from "@/app/_hooks/useTextarea";
import courtRegistry from "@/app/_services/courtRegistry";
import {
  BuildingDescriptionType,
  BuildingPartDescriptionType,
  FirstSectionType,
  LandDescriptionType,
  LandRightDescriptionType,
  SecondSectionType,
} from "@/app/_types";
import { errorToast, successToast } from "@/app/_utils/notifications";
import { useState } from "react";
import { useDaumPostcodePopup, Address } from "react-daum-postcode";

const RegistrationAddSection = () => {
  const [baseAddress, setBaseAddress] = useState("");
  const detailAddress = useInput({ input: "" });

  const open = useDaumPostcodePopup();

  const handleComplete = (data: Address) => {
    let fullAddress = data.autoJibunAddress || data.jibunAddress;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.buildingName !== "") {
        extraAddress = data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` ${extraAddress}` : "";
    }

    setBaseAddress(fullAddress);
  };

  const handleAddressSearch = async () => {
    await open({ onComplete: handleComplete });
  };

  const handleAddressReset = () => {
    setBaseAddress("");
    detailAddress.setValue("");
  };

  // ==================================================
  // buildingDescription
  // 표제부 ( 1동의 건물의 표시 )
  // ==================================================

  const buildingDescriptionDisplayNumber = useTextarea("");
  const buildingDescriptionReceiptDate = useTextarea("");
  const buildingDescriptionLocationNumber = useTextarea("");
  const buildingDescriptionBuildingDetails = useTextarea("");
  const buildingDescriptionRegistrationCause = useTextarea("");

  const [buildingDescriptionList, setBuildingDescriptionList] = useState<
    BuildingDescriptionType[]
  >([]);
  const handleBuildingDescriptionConfirm = () => {
    setBuildingDescriptionList((prev) => [
      ...prev,
      {
        displayNumber: buildingDescriptionDisplayNumber.value,
        receiptDate: buildingDescriptionReceiptDate.value,
        locationNumber: buildingDescriptionLocationNumber.value,
        buildingDetails: buildingDescriptionBuildingDetails.value,
        registrationCause: buildingDescriptionRegistrationCause.value,
      } as BuildingDescriptionType,
    ]);
    setBuildingDescriptionList((prev) =>
      [...prev].sort((a, b) => {
        const splitA = a.displayNumber.split("-").map(Number);
        const splitB = b.displayNumber.split("-").map(Number);
        for (let i = 0; i < Math.max(splitA.length, splitB.length); i += 1) {
          if ((splitA[i] || 0) !== (splitB[i] || 0)) {
            return (splitA[i] || 0) - (splitB[i] || 0);
          }
        }
        return 0;
      }),
    );
    buildingDescriptionDisplayNumber.setValue("");
    buildingDescriptionReceiptDate.setValue("");
    buildingDescriptionLocationNumber.setValue("");
    buildingDescriptionBuildingDetails.setValue("");
    buildingDescriptionRegistrationCause.setValue("");
  };
  const handleBuildingDescriptionDelete = (index: number) => {
    setBuildingDescriptionList((prev) => prev.filter((_, i) => i !== index));
  };

  // ==================================================
  // landDescription
  // 표제부 ( 1동의 건물의 표시 ) - ( 대지권의 목적인 토지의 표시 )
  // ==================================================

  const landDescriptionDisplayNumber = useTextarea("");
  const landDescriptionLocationNumber = useTextarea("");
  const landDescriptionLandType = useTextarea("");
  const landDescriptionArea = useTextarea("");
  const landDescriptionRegistrationCause = useTextarea("");

  const [landDescriptionList, setLandDescriptionList] = useState<
    LandDescriptionType[]
  >([]);
  const handleLandDescriptionConfirm = () => {
    setLandDescriptionList((prev) => [
      ...prev,
      {
        displayNumber: landDescriptionDisplayNumber.value,
        locationNumber: landDescriptionLocationNumber.value,
        landType: landDescriptionLandType.value,
        area: landDescriptionArea.value,
        registrationCause: landDescriptionRegistrationCause.value,
      } as LandDescriptionType,
    ]);
    setLandDescriptionList((prev) =>
      [...prev].sort((a, b) => {
        const splitA = a.displayNumber.split("-").map(Number);
        const splitB = b.displayNumber.split("-").map(Number);
        for (let i = 0; i < Math.max(splitA.length, splitB.length); i += 1) {
          if ((splitA[i] || 0) !== (splitB[i] || 0)) {
            return (splitA[i] || 0) - (splitB[i] || 0);
          }
        }
        return 0;
      }),
    );
    landDescriptionDisplayNumber.setValue("");
    landDescriptionLocationNumber.setValue("");
    landDescriptionLandType.setValue("");
    landDescriptionArea.setValue("");
    landDescriptionRegistrationCause.setValue("");
  };
  const handleLandDescriptionDelete = (index: number) => {
    setLandDescriptionList((prev) => prev.filter((_, i) => i !== index));
  };

  // ==================================================
  // buildingPartDescription
  // 표제부 ( 전유부분의 건물의 표시 )
  // ==================================================

  const buildingPartDescriptionDisplayNumber = useTextarea("");
  const buildingPartDescriptionReceiptDate = useTextarea("");
  const buildingPartDescriptionPartNumber = useTextarea("");
  const buildingPartDescriptionBuildingDetails = useTextarea("");
  const buildingPartDescriptionRegistrationCause = useTextarea("");

  const [buildingPartDescriptionList, setBuildingPartDescriptionList] =
    useState<BuildingPartDescriptionType[]>([]);

  const handleBuildingPartDescriptionConfirm = () => {
    setBuildingPartDescriptionList((prev) => [
      ...prev,
      {
        displayNumber: buildingPartDescriptionDisplayNumber.value,
        receiptDate: buildingPartDescriptionReceiptDate.value,
        partNumber: buildingPartDescriptionPartNumber.value,
        buildingDetails: buildingPartDescriptionBuildingDetails.value,
        registrationCause: buildingPartDescriptionRegistrationCause.value,
      } as BuildingPartDescriptionType,
    ]);
    setBuildingPartDescriptionList((prev) =>
      [...prev].sort((a, b) => {
        const splitA = a.displayNumber.split("-").map(Number);
        const splitB = b.displayNumber.split("-").map(Number);
        for (let i = 0; i < Math.max(splitA.length, splitB.length); i += 1) {
          if ((splitA[i] || 0) !== (splitB[i] || 0)) {
            return (splitA[i] || 0) - (splitB[i] || 0);
          }
        }
        return 0;
      }),
    );
    buildingPartDescriptionDisplayNumber.setValue("");
    buildingPartDescriptionReceiptDate.setValue("");
    buildingPartDescriptionPartNumber.setValue("");
    buildingPartDescriptionBuildingDetails.setValue("");
    buildingPartDescriptionRegistrationCause.setValue("");
  };
  const handleBuildingPartDescriptionDelete = (index: number) => {
    setBuildingPartDescriptionList((prev) =>
      prev.filter((_, i) => i !== index),
    );
  };

  // ==================================================
  // landRightDescription
  // 표제부 ( 전유부분의 건물의 표시 ) - ( 대지권의 표시 )
  // ==================================================

  const landRightDescriptionDisplayNumber = useTextarea("");
  const landRightDescriptionLandRightType = useTextarea("");
  const landRightDescriptionLandRightRatio = useTextarea("");
  const landRightDescriptionRegistrationCause = useTextarea("");

  const [landRightDescriptionList, setLandRightDescriptionList] = useState<
    LandRightDescriptionType[]
  >([]);

  const handleLandRightDescriptionConfirm = () => {
    setLandRightDescriptionList((prev) => [
      ...prev,
      {
        displayNumber: landRightDescriptionDisplayNumber.value,
        landRightType: landRightDescriptionLandRightType.value,
        landRightRatio: landRightDescriptionLandRightRatio.value,
        registrationCause: landRightDescriptionRegistrationCause.value,
      } as LandRightDescriptionType,
    ]);
    setLandRightDescriptionList((prev) =>
      [...prev].sort((a, b) => {
        const splitA = a.displayNumber.split("-").map(Number);
        const splitB = b.displayNumber.split("-").map(Number);
        for (let i = 0; i < Math.max(splitA.length, splitB.length); i += 1) {
          if ((splitA[i] || 0) !== (splitB[i] || 0)) {
            return (splitA[i] || 0) - (splitB[i] || 0);
          }
        }
        return 0;
      }),
    );
    landRightDescriptionDisplayNumber.setValue("");
    landRightDescriptionLandRightType.setValue("");
    landRightDescriptionLandRightRatio.setValue("");
    landRightDescriptionRegistrationCause.setValue("");
  };
  const handleLandRightDescriptionDelete = (index: number) => {
    setLandRightDescriptionList((prev) => prev.filter((_, i) => i !== index));
  };

  // ==================================================
  // firstSection
  // 갑구 ( 소유권에 관한 사항 )
  // ==================================================

  const firstSectionRankNumber = useTextarea("");
  const firstSectionRegistrationPurpose = useTextarea("");
  const firstSectionReceiptDate = useTextarea("");
  const firstSectionRegistrationCause = useTextarea("");
  const firstSectionHolderAndAdditionalInfo = useTextarea("");

  const [firstSectionList, setFirstSectionList] = useState<FirstSectionType[]>(
    [],
  );
  const handleFirstSectionConfirm = () => {
    setFirstSectionList((prev) => [
      ...prev,
      {
        rankNumber: firstSectionRankNumber.value,
        registrationPurpose: firstSectionRegistrationPurpose.value,
        receiptDate: firstSectionReceiptDate.value,
        registrationCause: firstSectionRegistrationCause.value,
        holderAndAdditionalInfo: firstSectionHolderAndAdditionalInfo.value,
      } as FirstSectionType,
    ]);
    setFirstSectionList((prev) =>
      [...prev].sort((a, b) => {
        const splitA = a.rankNumber.split("-").map(Number);
        const splitB = b.rankNumber.split("-").map(Number);
        for (let i = 0; i < Math.max(splitA.length, splitB.length); i += 1) {
          if ((splitA[i] || 0) !== (splitB[i] || 0)) {
            return (splitA[i] || 0) - (splitB[i] || 0);
          }
        }
        return 0;
      }),
    );
    firstSectionRankNumber.setValue("");
    firstSectionRegistrationPurpose.setValue("");
    firstSectionReceiptDate.setValue("");
    firstSectionRegistrationCause.setValue("");
    firstSectionHolderAndAdditionalInfo.setValue("");
  };
  const handleFirstSectionDelete = (index: number) => {
    setFirstSectionList((prev) => prev.filter((_, i) => i !== index));
  };

  // ==================================================
  // secondSection
  // 을구 ( 소유권 이외의 권리에 관한 사항 )
  // ==================================================

  const secondSectionRankNumber = useTextarea("");
  const secondSectionRegistrationPurpose = useTextarea("");
  const secondSectionReceiptDate = useTextarea("");
  const secondSectionRegistrationCause = useTextarea("");
  const secondSectionHolderAndAdditionalInfo = useTextarea("");

  const [secondSectionList, setSecondSectionList] = useState<
    SecondSectionType[]
  >([]);
  const handleSecondSectionConfirm = () => {
    setSecondSectionList((prev) => [
      ...prev,
      {
        rankNumber: secondSectionRankNumber.value,
        registrationPurpose: secondSectionRegistrationPurpose.value,
        receiptDate: secondSectionReceiptDate.value,
        registrationCause: secondSectionRegistrationCause.value,
        holderAndAdditionalInfo: secondSectionHolderAndAdditionalInfo.value,
      } as SecondSectionType,
    ]);
    setSecondSectionList((prev) =>
      [...prev].sort((a, b) => {
        const splitA = a.rankNumber.split("-").map(Number);
        const splitB = b.rankNumber.split("-").map(Number);
        for (let i = 0; i < Math.max(splitA.length, splitB.length); i += 1) {
          if ((splitA[i] || 0) !== (splitB[i] || 0)) {
            return (splitA[i] || 0) - (splitB[i] || 0);
          }
        }
        return 0;
      }),
    );
    secondSectionRankNumber.setValue("");
    secondSectionRegistrationPurpose.setValue("");
    secondSectionReceiptDate.setValue("");
    secondSectionRegistrationCause.setValue("");
    secondSectionHolderAndAdditionalInfo.setValue("");
  };
  const handleSecondSectionDelete = (index: number) => {
    setSecondSectionList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!baseAddress) {
      errorToast("주소를 입력해주세요.");
      return;
    }
    if (
      !buildingDescriptionList.length &&
      !landDescriptionList.length &&
      !buildingPartDescriptionList.length &&
      !landRightDescriptionList.length &&
      !firstSectionList.length &&
      !secondSectionList.length
    ) {
      errorToast("등기할 사항을 입력해주세요.");
      return;
    }

    const res = await courtRegistry({
      address: baseAddress,
      detailAddress: detailAddress.value,
      titleSection: {
        buildingDescription: buildingDescriptionList,
        landDescription: landDescriptionList,
      },
      exclusivePartDescription: {
        buildingPartDescription: buildingPartDescriptionList,
        landRightDescription: landRightDescriptionList,
      },
      firstSection: firstSectionList,
      secondSection: secondSectionList,
    });

    if (res.success) {
      successToast("등기가 성공적으로 등록되었습니다.");
    } else {
      errorToast(res.error?.message || "등기 등록에 실패했습니다.");
    }
  };

  return (
    <div className="flex w-full flex-col items-center py-5">
      <div className="flex w-full flex-col">
        <h3 className="mb-2 text-lg font-bold">주소</h3>
        {baseAddress ? (
          <>
            <div className="w-full rounded-lg bg-zinc-200 px-4 py-3 text-black">
              {baseAddress}
            </div>
            <input
              className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3"
              placeholder="상세주소"
              onChange={detailAddress.onChange}
              value={detailAddress.value}
              type="text"
            />
            <button
              className="mt-2 w-full rounded-lg bg-zinc-200 py-3 text-black"
              onClick={handleAddressReset}
              type="button"
            >
              재설정
            </button>
          </>
        ) : (
          <button
            className="w-full rounded-lg bg-blue-500 py-3 text-white transition-all duration-300 hover:bg-blue-600"
            onClick={handleAddressSearch}
            type="button"
          >
            주소 찾기
          </button>
        )}
      </div>
      <div className="mt-2 flex w-full flex-col">
        <h3 className="text-lg font-bold">표제부 ( 1동의 건물의 표시 )</h3>
        <div className="w-full whitespace-pre-wrap break-all text-center">
          <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>표시번호</div>
            <div className="lg:col-span-2">접수</div>
            <div className="lg:col-span-2">소재지번,건물명칭 및 번호</div>
            <div className="lg:col-span-2">건물내역</div>
            <div className="lg:col-span-2">등기원인 및 기타사항</div>
            <div />
          </div>
          {buildingDescriptionList.map((item, index) => (
            <div
              key={item.displayNumber}
              className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10"
            >
              <div className="">{item.displayNumber}</div>
              <div className="lg:col-span-2">{item.receiptDate}</div>
              <div className="lg:col-span-2">{item.locationNumber}</div>
              <div className="lg:col-span-2">{item.buildingDetails}</div>
              <div className="lg:col-span-2">{item.registrationCause}</div>
              <div className="flex">
                <button
                  className="m-auto w-full max-w-24 rounded-lg bg-red-500 py-2 text-white transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleBuildingDescriptionDelete(index)}
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="표시번호"
                onChange={buildingDescriptionDisplayNumber.onChange}
                value={buildingDescriptionDisplayNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="접수"
                onChange={buildingDescriptionReceiptDate.onChange}
                value={buildingDescriptionReceiptDate.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="소재지번,건물명칭 및 번호"
                onChange={buildingDescriptionLocationNumber.onChange}
                value={buildingDescriptionLocationNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="건물내역"
                onChange={buildingDescriptionBuildingDetails.onChange}
                value={buildingDescriptionBuildingDetails.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="등기원인 및 기타사항"
                onChange={buildingDescriptionRegistrationCause.onChange}
                value={buildingDescriptionRegistrationCause.value}
              />
            </div>
            <div className="flex">
              <button
                className="m-auto w-full max-w-24 rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600"
                onClick={handleBuildingDescriptionConfirm}
                type="button"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col">
        <h4 className="text-base font-bold">
          표제부 ( 1동의 건물의 표시 ) - ( 대지권의 목적인 토지의 표시 )
        </h4>
        <div className="w-full whitespace-pre-wrap break-all text-center">
          <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>표시번호</div>
            <div className="lg:col-span-2">소재지번</div>
            <div className="lg:col-span-2">지목</div>
            <div className="lg:col-span-2">면적</div>
            <div className="lg:col-span-2">등기원인 및 기타사항</div>
            <div />
          </div>
          {landDescriptionList.map((item, index) => (
            <div
              key={item.displayNumber}
              className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10"
            >
              <div className="">{item.displayNumber}</div>
              <div className="lg:col-span-2">{item.locationNumber}</div>
              <div className="lg:col-span-2">{item.landType}</div>
              <div className="lg:col-span-2">{item.area}</div>
              <div className="lg:col-span-2">{item.registrationCause}</div>
              <div className="flex">
                <button
                  className="m-auto w-full max-w-24 rounded-lg bg-red-500 py-2 text-white transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleLandDescriptionDelete(index)}
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="표시번호"
                onChange={landDescriptionDisplayNumber.onChange}
                value={landDescriptionDisplayNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="소재지번"
                onChange={landDescriptionLocationNumber.onChange}
                value={landDescriptionLocationNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="지목"
                onChange={landDescriptionLandType.onChange}
                value={landDescriptionLandType.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="면적"
                onChange={landDescriptionArea.onChange}
                value={landDescriptionArea.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="등기원인 및 기타사항"
                onChange={landDescriptionRegistrationCause.onChange}
                value={landDescriptionRegistrationCause.value}
              />
            </div>
            <div className="flex">
              <button
                className="m-auto w-full max-w-24 rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600"
                onClick={handleLandDescriptionConfirm}
                type="button"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col">
        <h3 className="text-lg font-bold">표제부 ( 전유부분의 건물의 표시 )</h3>
        <div className="w-full whitespace-pre-wrap break-all text-center">
          <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>표시번호</div>
            <div className="lg:col-span-2">접수</div>
            <div className="lg:col-span-2">건물번호</div>
            <div className="lg:col-span-2">건물내역</div>
            <div className="lg:col-span-2">등기원인 및 기타사항</div>
            <div />
          </div>
          {buildingPartDescriptionList.map((item, index) => (
            <div
              key={item.displayNumber}
              className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10"
            >
              <div className="">{item.displayNumber}</div>
              <div className="lg:col-span-2">{item.receiptDate}</div>
              <div className="lg:col-span-2">{item.partNumber}</div>
              <div className="lg:col-span-2">{item.buildingDetails}</div>
              <div className="lg:col-span-2">{item.registrationCause}</div>
              <div className="flex">
                <button
                  className="m-auto w-full max-w-24 rounded-lg bg-red-500 py-2 text-white transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleBuildingPartDescriptionDelete(index)}
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="표시번호"
                onChange={buildingPartDescriptionDisplayNumber.onChange}
                value={buildingPartDescriptionDisplayNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="접수"
                onChange={buildingPartDescriptionReceiptDate.onChange}
                value={buildingPartDescriptionReceiptDate.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="건물번호"
                onChange={buildingPartDescriptionPartNumber.onChange}
                value={buildingPartDescriptionPartNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="건물내역"
                onChange={buildingPartDescriptionBuildingDetails.onChange}
                value={buildingPartDescriptionBuildingDetails.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="등기원인 및 기타사항"
                onChange={buildingPartDescriptionRegistrationCause.onChange}
                value={buildingPartDescriptionRegistrationCause.value}
              />
            </div>
            <div className="flex">
              <button
                className="m-auto w-full max-w-24 rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600"
                onClick={handleBuildingPartDescriptionConfirm}
                type="button"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col">
        <h4 className="text-base font-bold">
          표제부 ( 전유부분의 건물의 표시 ) - ( 대지권의 표시 )
        </h4>
        <div className="w-full whitespace-pre-wrap break-all text-center">
          <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-8">
            <div>표시번호</div>
            <div className="lg:col-span-2">대지권종류</div>
            <div className="lg:col-span-2">대지권비율</div>
            <div className="lg:col-span-2">등기원인 및 기타사항</div>
            <div />
          </div>
          {landRightDescriptionList.map((item, index) => (
            <div
              key={item.displayNumber}
              className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-8"
            >
              <div className="">{item.displayNumber}</div>
              <div className="lg:col-span-2">{item.landRightType}</div>
              <div className="lg:col-span-2">{item.landRightRatio}</div>
              <div className="lg:col-span-2">{item.registrationCause}</div>
              <div className="flex">
                <button
                  className="m-auto w-full max-w-24 rounded-lg bg-red-500 py-2 text-white transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleLandRightDescriptionDelete(index)}
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-8">
            <div>
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="표시번호"
                onChange={landRightDescriptionDisplayNumber.onChange}
                value={landRightDescriptionDisplayNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="대지권종류"
                onChange={landRightDescriptionLandRightType.onChange}
                value={landRightDescriptionLandRightType.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="대지권비율"
                onChange={landRightDescriptionLandRightRatio.onChange}
                value={landRightDescriptionLandRightRatio.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="등기원인 및 기타사항"
                onChange={landRightDescriptionRegistrationCause.onChange}
                value={landRightDescriptionRegistrationCause.value}
              />
            </div>
            <div className="flex">
              <button
                className="m-auto w-full max-w-24 rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600"
                onClick={handleLandRightDescriptionConfirm}
                type="button"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col">
        <h3 className="text-lg font-bold">갑구 ( 소유권에 관한 사항 )</h3>
        <div className="w-full whitespace-pre-wrap break-all text-center">
          <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>순위번호</div>
            <div className="lg:col-span-2">등기목적</div>
            <div className="lg:col-span-2">접수</div>
            <div className="lg:col-span-2">등기원인</div>
            <div className="lg:col-span-2">권리자 및 기타사항</div>
            <div />
          </div>
          {firstSectionList.map((item, index) => (
            <div
              key={item.rankNumber}
              className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10"
            >
              <div className="">{item.rankNumber}</div>
              <div className="lg:col-span-2">{item.registrationPurpose}</div>
              <div className="lg:col-span-2">{item.receiptDate}</div>
              <div className="lg:col-span-2">{item.registrationCause}</div>
              <div className="lg:col-span-2">
                {item.holderAndAdditionalInfo}
              </div>
              <div className="flex">
                <button
                  className="m-auto w-full max-w-24 rounded-lg bg-red-500 py-2 text-white transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleFirstSectionDelete(index)}
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="순위번호"
                onChange={firstSectionRankNumber.onChange}
                value={firstSectionRankNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="등기목적"
                onChange={firstSectionRegistrationPurpose.onChange}
                value={firstSectionRegistrationPurpose.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="접수"
                onChange={firstSectionReceiptDate.onChange}
                value={firstSectionReceiptDate.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="등기원인"
                onChange={firstSectionRegistrationCause.onChange}
                value={firstSectionRegistrationCause.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="권리자 및 기타사항"
                onChange={firstSectionHolderAndAdditionalInfo.onChange}
                value={firstSectionHolderAndAdditionalInfo.value}
              />
            </div>
            <div className="flex">
              <button
                className="m-auto w-full max-w-24 rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600"
                onClick={handleFirstSectionConfirm}
                type="button"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col">
        <h3 className="text-lg font-bold">
          을구 ( 소유권 이외의 권리에 관한 사항 )
        </h3>
        <div className="w-full whitespace-pre-wrap break-all text-center">
          <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>순위번호</div>
            <div className="lg:col-span-2">등기목적</div>
            <div className="lg:col-span-2">접수</div>
            <div className="lg:col-span-2">등기원인</div>
            <div className="lg:col-span-2">권리자 및 기타사항</div>
            <div />
          </div>
          {secondSectionList.map((item, index) => (
            <div
              key={item.rankNumber}
              className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10"
            >
              <div className="">{item.rankNumber}</div>
              <div className="lg:col-span-2">{item.registrationPurpose}</div>
              <div className="lg:col-span-2">{item.receiptDate}</div>
              <div className="lg:col-span-2">{item.registrationCause}</div>
              <div className="lg:col-span-2">
                {item.holderAndAdditionalInfo}
              </div>
              <div className="flex">
                <button
                  className="m-auto w-full max-w-24 rounded-lg bg-red-500 py-2 text-white transition-all duration-300 hover:bg-red-600"
                  onClick={() => handleSecondSectionDelete(index)}
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-10">
            <div>
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="순위번호"
                onChange={secondSectionRankNumber.onChange}
                value={secondSectionRankNumber.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="등기목적"
                onChange={secondSectionRegistrationPurpose.onChange}
                value={secondSectionRegistrationPurpose.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="접수"
                onChange={secondSectionReceiptDate.onChange}
                value={secondSectionReceiptDate.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="등기원인"
                onChange={secondSectionRegistrationCause.onChange}
                value={secondSectionRegistrationCause.value}
              />
            </div>
            <div className="lg:col-span-2">
              <textarea
                className="min-h-32 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors duration-300 focus:border-blue-500"
                placeholder="권리자 및 기타사항"
                onChange={secondSectionHolderAndAdditionalInfo.onChange}
                value={secondSectionHolderAndAdditionalInfo.value}
              />
            </div>
            <div className="flex">
              <button
                className="m-auto w-full max-w-24 rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600"
                onClick={handleSecondSectionConfirm}
                type="button"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col">
        <button
          className="mt-2 w-full rounded-lg bg-blue-500 py-3 text-white transition-all duration-300 hover:bg-blue-600"
          onClick={handleSubmit}
          type="button"
        >
          등기 저장
        </button>
      </div>
    </div>
  );
};

export default RegistrationAddSection;
