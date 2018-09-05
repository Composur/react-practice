import React from 'react'
import {Table, Icon} from 'antd'
import $ from 'axios'
export default class myTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: []
        }
    }

  async  componentDidMount() {
        const data = []
        // const url='http://localhost:8124/msg'
        const url='http://120.78.133.26:8124/msg'


    await  $.get(url).then(result=>{
           (result.data).forEach(element => {
               console.log(element)
            data.push({
                name:element.name,
                email: element.email,
                phone: element.phone,
                msg: element.msg,
                company: element.company,
                companySize: element.companySize,
                want:element.want,
                location:element.location[0].Provinces+','+element.location[0].city,
                applyTime:new Date(element.meta.createAt).toLocaleString()
            })    
           });
        })
        console.log(data)
        this.setState({
            tDate: data
        })
    }

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    render() {
        const columns = [{
            title: 'name',
            width: '5%',
            dataIndex: 'name'
        }, {
            title: 'email',
            width: '10%',
            dataIndex: 'email',
        }, {
            title: 'phone',
            width: '10%',
            dataIndex: 'phone'
        },
         {
            title: 'company',
            width: '10%',
            dataIndex: 'company'
        },
         {
            title: 'companySize',
            width: '10%',
            dataIndex: 'companySize'
        },
         {
            title: 'want',
            width: '5%',
            dataIndex: 'want'
        },
         {
            title: 'location',
            width: '10%',
            dataIndex: 'location'
        },
        {
            title: 'msg',
            width: '10%',
            dataIndex: 'msg',
        },
         {
            title: '申请时间',
            width: '10%',
            dataIndex: 'applyTime'
        },
         {
            title: '操作',
            width: '10%',
            dataIndex: 'operate'
        },
    ]

        const { selectedRowKeys } = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const pagination = {
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return (
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tDate} bordered pagination={pagination} />
        )
    }
}
