import { Button } from "antd";
import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { NotificationManager } from "react-notifications";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import Search from "antd/lib/input/Search";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, [name]);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        NotificationManager.success(
          `${res.data.name} created successfully!`,
          "Success"
        );
        setName("");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400)
          NotificationManager.error(err.response.data, "Error!", 2000);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete Category?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          NotificationManager.warning(
            `${res.data.name} Deleted successfully!`,
            "Complete"
          );
          setLoading(false);
          setName("");
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          if (err.status === 400) {
            NotificationManager.error(err.response.data);
          }
        });
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (k) => (c) => c.name.toLowerCase().includes(k);

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-md-2">
          <AdminNav prop="category" />
        </div>

        <div className="col-md-8 mt-4 " style={{ margin: "0 auto" }}>
          <nav
            className="navbar mb-4 bg-light form-inline"
            style={{ borderRadius: "10px 10px 0 0", width: "100%" }}
          >
            {loading ? (
              <h5
                className="navbar-brand "
                style={{ fontFamily: "Roboto", margin: "auto 0" }}
              >
                <strong className="text-warning">Loading...</strong>
              </h5>
            ) : (
              <h4
                className="navbar-brand"
                style={{ fontFamily: "Roboto", margin: "auto 0" }}
              >
                new-category
              </h4>
            )}
            {/* <Search
              placeholder="Filter category"
              allowClear
              enterButton="Search"
              className="float-right col-md-5 "
              style={{ height: "2.9em" }}
              onSearch={handleSearch}
            /> */}

            <div class="input-group ">
              <input
                type="text"
                class="form-control mr-sm-2 px-2"
                placeholder="Filter Category"
                style={{ width: "18em", background: "#fff", height: "2.4em" }}
                onChange={handleSearch}
              />

              <span class="">
                <Button
                  type="primary"
                  // shape="circle"
                  icon={<SearchOutlined />}
                  size={"medium"}
                  className="float-right"
                  // onClick={handleClick}
                />
              </span>
            </div>
          </nav>
          <div className="bg-light p-2">
            {/* {categoryForm()} */}
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            {categories.filter(searched(keyword)).map((c) => (
              <div
                className="alert alert-primary "
                style={{ fontSize: "16px", color: "#2f2f2f" }}
                key={c._id}
              >
                {c.name}{" "}
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size={"medium"}
                  className="float-right mx-3"
                  onClick={() => handleRemove(c.slug)}
                  danger
                />
                <Link to={`/admin/category/${c.slug}`}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    size={"medium"}
                    className="float-right"
                    // onClick={handleClick}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
