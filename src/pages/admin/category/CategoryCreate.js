import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { NotificationManager } from "react-notifications";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

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

  const categoryForm = () => (
    <form style={{ padding: ".3em 3em" }} onSubmit={handleSubmit}>
      <div className="form-group">
        <strong className="mx-2" style={{ fontSize: "16px" }}>
          NAME:
        </strong>
        <Input
          style={{ height: "3.5em", margin: "auto", maxWidth: "45em" }}
          type="text"
          placeholder="Input category name . . ."
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={handleSubmit}
        block
        shape="round"
        icon={<SendOutlined />}
        className="col-md-3"
        style={{ margin: "2px 30%" }}
        disabled={name.length < 3}
      >
        Submit
      </Button>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-2">
          <AdminNav prop="category" />
        </div>
        <div
          className="col-md-8 mt-4 "
          style={{ padding: "1em auto", margin: "0 auto" }}
        >
          {loading ? (
            <h5>
              <strong className="text-warning">Loading...</strong>
            </h5>
          ) : (
            <h4 className="mb-4">Create Category</h4>
          )}
          {categoryForm()}
          {categories.map((c) => (
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
  );
};

export default CategoryCreate;
