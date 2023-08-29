import { Avatar, Space, Table, Typography } from "antd"
import { useEffect, useState } from "react"

function User() {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setLoading(true)
    getUser().then((res) => {
      setDataSource(res.users)
      setLoading(false)
    });
  }, [])

  const columns = [
    {
      title: "Photo",
      dataIndex: "image",
      render: (link) => {
        return <Avatar src={link} />
      }
    },
    {
      title: "First Name",
      dataIndex: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Address",
      // eslint-disable-next-line prettier/prettier
      dataIndex: "address",
      render: (address) => {
        return (
          <span>
            {address.address}, {address.city}
          </span>
        )
      }
    }
  ]

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>User</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5
        }}
      />
    </Space>
  );
}

export default User;

async function getUser() {
  const response = await fetch("https://ecom-be-htgu.onrender.com/users")
  const data = await response.json()
  return data
}