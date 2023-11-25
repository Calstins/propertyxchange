import { useSelector } from 'react-redux';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { locationData } from '../appData';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import Dashboard from './Dashboard';
import { FaLinkedin } from 'react-icons/fa';
import { FaWhatsappSquare } from 'react-icons/fa';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import { TbDeviceLandlinePhone } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa6';
import { FaRegBuilding } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa6';
import { CiWarning } from 'react-icons/ci';

import companyLogo from '../assets/default-logo.png';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  //states and LGA
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [lga, setLGA] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState('');
  //validate social link input
  const [linkedInLinkErr, setLinkedInLinkErr] = useState(false);
  const [instagramLinkErr, setInstagramLinkErr] = useState(false);
  const [twitterLinkErr, setTwitterLinkErr] = useState(false);
  const [facebookLinkErr, setFacebookLinkErr] = useState(false);

  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    email2: '',
    password: '',
    contactName: '',
    accountType: '',
    companyName: '',
    businessCategory: '',
    description: '',
    services: '',
    linkedInLink: '',
    instagramLink: '',
    twitterLink: '',
    facebookLink: '',
    phoneNum1: '',
    phoneNum2: '',
    whatsAppNum: '',
    address: '',
    state: '',
    lga: '',
    verification: false,
    uploadDoc: '',
    logo: '',
    avatar: '',
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    // Assuming locationData is an array of objects with 'state' and 'lga' properties
    const statesList = locationData.map((location) => location.state);
    setStates(statesList);
  }, []);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    //state
    if (e.target.id === 'state') {
      setSelectedState(e.target.value);
      // Find the corresponding LGAs for the selected state
      const selectedStateData = locationData.find(
        (location) => location.state === e.target.value
      );
      const lgaList = selectedStateData ? selectedStateData.lga : [];
      setLGA(lgaList);
      setSelectedLGA('');
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

    //LGA
    if (e.target.id === 'lga') {
      setSelectedLGA(e.target.value);
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

    if (
      e.target.id === 'survey' ||
      e.target.id === 'organization' ||
      e.target.id === 'agent' ||
      e.target.id === 'law' ||
      e.target.id === 'developer'
    ) {
      setFormData({
        ...formData,
        accountType: e.target.id,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'tel' ||
      e.target.type === 'textarea' ||
      e.target.type === 'email' ||
      e.target.type === 'url'
    ) {
      const inputId = e.target.id;
      const inputValue = e.target.value;
      // Check for instagram link input
      if (inputId === 'instagramLink') {
        const isValidInstagramLink =
          /^(https?:\/\/)?(www\.)?instagram\.com/.test(inputValue);
        setInstagramLinkErr(!isValidInstagramLink);

        if (isValidInstagramLink) {
          setFormData({
            ...formData,
            [inputId]: inputValue,
          });
        }
      }
      // Check for linkediN link input
      if (inputId === 'linkedInLink') {
        const isValidLinkedInLink = /^(https?:\/\/)?(www\.)?linkedIn\.com/.test(
          inputValue
        );

        setLinkedInLinkErr(!isValidLinkedInLink);
        if (!isValidLinkedInLink) {
          setFormData({
            ...formData,
            [inputId]: '',
          });
        } else {
          setFormData({
            ...formData,
            [inputId]: inputValue,
          });
        }
      }
      // Check for facebook link input
      if (inputId === 'facebookLink') {
        const isValidFacebookLink = /^(https?:\/\/)?(www\.)?facebook\.com/.test(
          inputValue
        );
        setFacebookLinkErr(!isValidFacebookLink);

        if (isValidFacebookLink) {
          setFormData({
            ...formData,
            [inputId]: inputValue,
          });
        }
      }
      // Check for twitter link input
      if (inputId === 'twitterLink') {
        const isValidTwitterLink = /^(https?:\/\/)?(www\.)?twitter\.com/.test(
          inputValue
        );
        setTwitterLinkErr(!isValidTwitterLink);

        if (isValidTwitterLink) {
          setFormData({
            ...formData,
            [inputId]: inputValue,
          });
        }
      }

      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/sign-out');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Dashboard>
      <main className="p-3 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-center my-3">Profile</h1>
        <div className="bg-red-400 text-white p-4 h-100 text-center rounded-md mt-3 mb-3 flex-col justify-center items-center  gap-2">
          <div className="flex justify-center items-center gap-2">
            <CiWarning className="text-xl" />
            <h1 className="text-lg">Account not verified!</h1>
          </div>
          <div className="flex justify-center items-center gap-2">
            <h2 className="text-sm">
              Verify your account to get our verification badge on your profile.
            </h2>
            <Link className="underline text-sm" to="/verify">
              Get Started
            </Link>
          </div>
        </div>
        <form
          className="flex flex-col sm:flex-row gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col flex-1 gap-9 text-sm">
            <div className="flex gap-3 justify-center items-center">
              <div className="flex flex-col mr-1">
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
                <img
                  onClick={() => fileRef.current.click()}
                  src={formData.avatar || currentUser.avatar}
                  alt="profile"
                  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
                <p className="text-sm self-center">
                  {fileUploadError ? (
                    <span className="text-red-700">
                      Error Image upload (image must be less than 2 mb)
                    </span>
                  ) : filePercentage > 0 && filePercentage < 100 ? (
                    <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
                  ) : filePercentage === 100 ? (
                    <span className="text-green-700">
                      Image successfully uploaded!
                    </span>
                  ) : (
                    ''
                  )}
                </p>
                <p className="text-gray-600 text-center text-xs mt-3">
                  Click the image to edit
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-grow">
                <input
                  type="text"
                  placeholder="username"
                  defaultValue={currentUser.username}
                  id="username"
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  placeholder="email"
                  id="email"
                  defaultValue={currentUser.email}
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                  id="password"
                  className="border p-3 rounded-lg"
                  defaultValue={currentUser.password}
                />
              </div>
            </div>
            <div className="flex justify-evenly flex-wrap">
              <div className="flex mt-3">
                <input
                  type="checkbox"
                  id="agent"
                  className="w-5 mr-1"
                  onChange={handleChange}
                  checked={formData.accountType === 'agent'}
                />
                <span>Individual Agent</span>
              </div>
              <div className="flex mt-3">
                <input
                  type="checkbox"
                  id="developer"
                  className="w-5 mr-1"
                  onChange={handleChange}
                  checked={formData.accountType === 'developer'}
                />
                <span>Developer</span>
              </div>
              <div className="flex mt-3">
                <input
                  type="checkbox"
                  id="law"
                  className="w-5 mr-1"
                  onChange={handleChange}
                  checked={formData.accountType === 'law'}
                />
                <span>Law Firm</span>
              </div>
              <div className="flex mt-3">
                <input
                  type="checkbox"
                  id="survey"
                  className="w-5 mr-1"
                  onChange={handleChange}
                  checked={formData.accountType === 'survey'}
                />
                <span>Estate Surveying Firm </span>
              </div>
              <div className="flex mt-3">
                <input
                  type="checkbox"
                  id="organization"
                  className="w-5 mr-1"
                  onChange={handleChange}
                  checked={formData.accountType === 'organization'}
                />
                <span>Real Estate Organization</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                <FaRegUser className=" text-gray-700 text-xl" />
                <input
                  type="text"
                  placeholder="Contact Name"
                  className="w-full focus:border-none focus:outline-none"
                  id="contactName"
                  onChange={handleChange}
                  defaultValue={formData.contactName}
                />
              </div>
              <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                <TbDeviceLandlinePhone className=" text-gray-700 text-xl" />
                <input
                  type="tel"
                  placeholder="Mandatory Phone Number "
                  className="w-full focus:border-none focus:outline-none"
                  id="phoneNum1"
                  onChange={handleChange}
                  defaultValue={formData.phoneNum1}
                  required
                />
              </div>
              <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                <FaWhatsappSquare className=" text-gray-700 text-xl" />
                <input
                  type="tel"
                  placeholder="WhatsApp Number"
                  className="w-full focus:border-none focus:outline-none"
                  id="whatsAppNum"
                  onChange={handleChange}
                  defaultValue={formData.whatsAppNum}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-center items-center">
                <div className="flex flex-col mr-3">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                  />
                  <img
                    onClick={() => fileRef.current.click()}
                    src={formData.logo || companyLogo}
                    alt="company logo"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                  />
                  <p className="text-sm self-center">
                    {fileUploadError ? (
                      <span className="text-red-700">
                        Error Image upload (image must be less than 2 mb)
                      </span>
                    ) : filePercentage > 0 && filePercentage < 100 ? (
                      <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
                    ) : filePercentage === 100 ? (
                      <span className="text-green-700">
                        Image successfully uploaded!
                      </span>
                    ) : (
                      ''
                    )}
                  </p>
                  <p className="text-gray-600 text-center text-xs mt-3">
                    Click the image to edit
                  </p>
                </div>
                <div className="flex flex-col gap-3 flex-grow">
                  <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                    <FaRegBuilding className=" text-gray-700 text-xl" />
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full focus:border-none focus:outline-none"
                      id="companyName"
                      onChange={handleChange}
                      defaultValue={formData.companyName}
                      required
                    />
                  </div>
                  <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                    <FaRegEnvelope className=" text-gray-700 text-xl" />
                    <input
                      type="email"
                      placeholder="Company email"
                      className="w-full focus:border-none focus:outline-none"
                      id="email2"
                      onChange={handleChange}
                      defaultValue={formData.email2}
                    />
                  </div>
                  <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                    <TbDeviceLandlinePhone className=" text-gray-700 text-xl" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full focus:border-none focus:outline-none"
                      id="phoneNum2"
                      onChange={handleChange}
                      defaultValue={formData.phoneNum2}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Address"
                className="border p-3 rounded-lg"
                id="street"
                required
                onChange={handleChange}
                defaultValue={formData.street}
              />
              <div className="flex gap-3">
                <div className="w-[50%]">
                  <label htmlFor="lga" className="mr-3">
                    LGA:
                  </label>
                  <select
                    className="border p-3 rounded-lg w-[70%]"
                    id="lga"
                    value={selectedLGA}
                    onChange={(e) => {
                      setSelectedLGA(e.target.value);
                      handleChange(e);
                    }}
                    required
                  >
                    <option value="">Select LGA</option>
                    {lga.map((lga, index) => (
                      <option key={index} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[50%]">
                  <label htmlFor="state" className="mr-3">
                    State:
                  </label>
                  <select
                    className="border p-3 rounded-lg w-[70%]"
                    id="state"
                    value={selectedState}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-9 text-sm">
            <div className="flex flex-col gap-3">
              <textarea
                type="text"
                placeholder="About your company"
                className="border p-3 rounded-lg"
                id="description"
                rows={5}
                onChange={handleChange}
                defaultValue={formData.description}
              />
              <textarea
                type="text"
                placeholder="Services you provide eg facility Management"
                className="border p-3 rounded-lg"
                id="services"
                rows={5}
                onChange={handleChange}
                defaultValue={formData.services}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Instagram link</p>
                <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                  <AiFillInstagram className=" text-gray-700 text-xl" />
                  <input
                    type="url"
                    placeholder="eg: https://www.instagram.com/propertyxhange"
                    className="w-full focus:border-none focus:outline-none"
                    id="instagramLink"
                    onChange={handleChange}
                    defaultValue={formData.instagramLink}
                  />
                </div>
                {instagramLinkErr && (
                  <p className="text-red-700 text-xs">Invalid Instagram URL</p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Twitter link</p>
                <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                  <FaSquareXTwitter className=" text-gray-700 text-xl" />
                  <input
                    type="url"
                    placeholder="eg: https://www.twitter.com/propertyxhange"
                    className="w-full focus:border-none focus:outline-none"
                    id="twitterLink"
                    onChange={handleChange}
                    defaultValue={formData.twitterLink}
                  />
                </div>
                {twitterLinkErr && (
                  <p className="text-red-700 text-xs">Invalid Twitter URL</p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">LinkedIn link</p>
                <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                  <FaLinkedin className="text-gray-700 text-xl" />
                  <input
                    type="url"
                    placeholder="eg: https://www.linkedIn.com/propertyxhange"
                    className="w-full focus:border-none focus:outline-none"
                    id="linkedInLink"
                    onChange={handleChange}
                    defaultValue={formData.linkedInLink}
                  />
                </div>
                {linkedInLinkErr && (
                  <p className="text-red-700 text-xs">Invalid LinkedIn URL</p>
                )}
              </div>
              <div className="w-[100%]">
                <p className="text-xs text-gray-600 mb-1">Facebook link</p>
                <div className="flex gap-3 justify-start items-center  bg-white border p-2 rounded-lg">
                  <FaSquareFacebook className=" text-gray-700 text-xl" />
                  <input
                    type="url"
                    placeholder="eg: https://www.facebook.com/propertyxhange"
                    className="w-full focus:border-none focus:outline-none"
                    id="facebookLink"
                    onChange={handleChange}
                    defaultValue={formData.facebookLink}
                  />
                </div>
                {facebookLinkErr && (
                  <p className="text-red-700 text-xs">Invalid facebook URL</p>
                )}
              </div>
            </div>
            <button
              disabled={loading}
              className="bg-slate-700 text-white rounded-lg p-3 uppercentagease hover:opacity-95 disabled:opacity-80"
            >
              {loading ? 'Loading...' : 'Update'}
            </button>
            <div className="flex justify-between">
              <span
                onClick={handleDeleteUser}
                className="text-red-700 cursor-pointer"
              >
                Delete account
              </span>
              <span
                onClick={handleSignOut}
                className="text-red-700 cursor-pointer"
              >
                Sign out
              </span>
            </div>
            <p className="text-red-700 mt-5">{error ? error : ''}</p>
            <p className="text-green-700 mt-5">
              {updateSuccess ? 'User is updated successfully!' : ''}
            </p>
          </div>
        </form>
      </main>
    </Dashboard>
  );
}
