import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'

export default function MarketPairs() {
    return (
        <div className="market-pairs">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">
                        <i className="icon ion-md-search" />
                    </span>
                </div>
                <input type="text" className="form-control" placeholder="Search token name / address..." aria-describedby="inputGroup-sizing-sm" />
            </div>
            <Tabs defaultActiveKey="btc">
                <Tab eventKey="star" title="★">
                    <table className="table star-active">
                        <thead>
                            <tr>
                                <th>Pairs</th>
                                <th>Last Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ETH/BTC
                                </td>
                                <td>0.00020255</td>
                                <td className="red">-2.58%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KCS/BTC
                                </td>
                                <td>0.00013192</td>
                                <td className="green">+5.6%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XRP/BTC
                                </td>
                                <td>0.00002996</td>
                                <td className="red">-1.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> VET/BTC
                                </td>
                                <td>0.00000103</td>
                                <td className="green">+1.8%</td>
                            </tr>
                        </tbody>
                    </table>
                </Tab>
                <Tab eventKey="btc" title="BTC">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Pairs</th>
                                <th>Last Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ETH/BTC
                                </td>
                                <td>0.00020255</td>
                                <td className="red">-2.58%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KCS/BTC
                                </td>
                                <td>0.00013192</td>
                                <td className="green">+5.6%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XRP/BTC
                                </td>
                                <td>0.00002996</td>
                                <td className="red">-1.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> VET/BTC
                                </td>
                                <td>0.00000103</td>
                                <td className="green">+1.8%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> EOS/BTC
                                </td>
                                <td>0.00000103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BTT/BTC
                                </td>
                                <td>0.00002303</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> LTC/BTC
                                </td>
                                <td>0.03520103</td>
                                <td className="green">+1.5%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRX/BTC
                                </td>
                                <td>0.00330103</td>
                                <td className="red">-3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BSV/BTC
                                </td>
                                <td>0.00300103</td>
                                <td className="green">+2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> COTI/BTC
                                </td>
                                <td>0.003500103</td>
                                <td className="green">+2.85%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XYT/BTC
                                </td>
                                <td>0.00003103</td>
                                <td className="green">+3.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BNB/BTC
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XMR/BTC
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRY/BTC
                                </td>
                                <td>0.00000123</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ADA/BTC
                                </td>
                                <td>0.00050103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> NEO/BTC
                                </td>
                                <td>0.00340103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XLM/BTC
                                </td>
                                <td>0.00035103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ENQ/BTC
                                </td>
                                <td>0.00354103</td>
                                <td className="green">+2.02%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AVA/BTC
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AMB/BTC
                                </td>
                                <td>0.05335103</td>
                                <td className="green">+1.0%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> MAP/BTC
                                </td>
                                <td>0.00234103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GO/BTC
                                </td>
                                <td>0.00354103</td>
                                <td className="red">-6.50%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KICK/BTC
                                </td>
                                <td>0.02053103</td>
                                <td className="red">-6.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> DBC/BTC
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+7.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GGC/BTC
                                </td>
                                <td>0.00353103</td>
                                <td className="red">-4.05%</td>
                            </tr>
                        </tbody>
                    </table>
                </Tab>
                <Tab eventKey="eth" title="ETH">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Pairs</th>
                                <th>Last Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BTC/ETH
                                </td>
                                <td>0.00020255</td>
                                <td className="green">+1.58%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KCS/ETH
                                </td>
                                <td>0.00013192</td>
                                <td className="red">-0.6%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XRP/ETH
                                </td>
                                <td>0.00002996</td>
                                <td className="red">-0.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> VET/ETH
                                </td>
                                <td>0.00000103</td>
                                <td className="green">+1.8%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> EOS/ETH
                                </td>
                                <td>0.00000103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BTT/ETH
                                </td>
                                <td>0.00002303</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> LTC/ETH
                                </td>
                                <td>0.03520103</td>
                                <td className="green">+1.5%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRX/ETH
                                </td>
                                <td>0.00330103</td>
                                <td className="red">-3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BSV/ETH
                                </td>
                                <td>0.00300103</td>
                                <td className="green">+2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> COTI/ETH
                                </td>
                                <td>0.003500103</td>
                                <td className="green">+2.85%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XYT/ETH
                                </td>
                                <td>0.00003103</td>
                                <td className="green">+3.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BNB/ETH
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XMR/ETH
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRY/ETH
                                </td>
                                <td>0.00000123</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ADA/ETH
                                </td>
                                <td>0.00050103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> NEO/ETH
                                </td>
                                <td>0.00340103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XLM/ETH
                                </td>
                                <td>0.00035103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ENQ/ETH
                                </td>
                                <td>0.00354103</td>
                                <td className="green">+2.02%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AVA/ETH
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AMB/ETH
                                </td>
                                <td>0.05335103</td>
                                <td className="green">+1.0%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> MAP/ETH
                                </td>
                                <td>0.00234103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GO/ETH
                                </td>
                                <td>0.00354103</td>
                                <td className="red">-6.50%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KICK/ETH
                                </td>
                                <td>0.02053103</td>
                                <td className="red">-6.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> DBC/ETH
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+7.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GGC/ETH
                                </td>
                                <td>0.00353103</td>
                                <td className="red">-4.05%</td>
                            </tr>
                        </tbody>
                    </table>
                </Tab>
                <Tab eventKey="neo" title="NEO">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Pairs</th>
                                <th>Last Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ETH/NEO
                                </td>
                                <td>0.00350255</td>
                                <td className="red">-6.58%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KCS/NEO
                                </td>
                                <td>0.00013192</td>
                                <td className="green">+0.6%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XRP/NEO
                                </td>
                                <td>0.00002996</td>
                                <td className="red">-0.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> VET/NEO
                                </td>
                                <td>0.00000103</td>
                                <td className="green">+1.8%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> EOS/NEO
                                </td>
                                <td>0.00000103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BTT/NEO
                                </td>
                                <td>0.00002303</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> LTC/NEO
                                </td>
                                <td>0.03520103</td>
                                <td className="green">+1.5%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRX/NEO
                                </td>
                                <td>0.00330103</td>
                                <td className="red">-3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BSV/NEO
                                </td>
                                <td>0.00300103</td>
                                <td className="green">+2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> COTI/NEO
                                </td>
                                <td>0.003500103</td>
                                <td className="green">+2.85%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XYT/NEO
                                </td>
                                <td>0.00003103</td>
                                <td className="green">+3.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BNB/NEO
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XMR/NEO
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRY/NEO
                                </td>
                                <td>0.00000123</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ADA/NEO
                                </td>
                                <td>0.00050103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> NEO/NEO
                                </td>
                                <td>0.00340103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XLM/NEO
                                </td>
                                <td>0.00035103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ENQ/NEO
                                </td>
                                <td>0.00354103</td>
                                <td className="green">+2.02%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AVA/NEO
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AMB/NEO
                                </td>
                                <td>0.05335103</td>
                                <td className="green">+1.0%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> MAP/NEO
                                </td>
                                <td>0.00234103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GO/NEO
                                </td>
                                <td>0.00354103</td>
                                <td className="red">-6.50%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KICK/NEO
                                </td>
                                <td>0.02053103</td>
                                <td className="red">-6.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> DBC/NEO
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+7.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GGC/NEO
                                </td>
                                <td>0.00353103</td>
                                <td className="red">-4.05%</td>
                            </tr>
                        </tbody>
                    </table>
                </Tab>
                <Tab eventKey="usdt" title="USDT">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Pairs</th>
                                <th>Last Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ETH/USDT
                                </td>
                                <td>0.00350255</td>
                                <td className="red">-2.58%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KCS/USDT
                                </td>
                                <td>0.00013192</td>
                                <td className="green">+6.6%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XRP/USDT
                                </td>
                                <td>0.00002996</td>
                                <td className="red">-0.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> VET/USDT
                                </td>
                                <td>0.00000103</td>
                                <td className="green">+1.8%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> EOS/USDT
                                </td>
                                <td>0.00000103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BTT/USDT
                                </td>
                                <td>0.00002303</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> LTC/USDT
                                </td>
                                <td>0.03520103</td>
                                <td className="green">+1.5%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRX/USDT
                                </td>
                                <td>0.00330103</td>
                                <td className="red">-3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BSV/USDT
                                </td>
                                <td>0.00300103</td>
                                <td className="green">+2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> COTI/USDT
                                </td>
                                <td>0.003500103</td>
                                <td className="green">+2.85%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XYT/USDT
                                </td>
                                <td>0.00003103</td>
                                <td className="green">+3.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BNB/USDT
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XMR/USDT
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRY/USDT
                                </td>
                                <td>0.00000123</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ADA/USDT
                                </td>
                                <td>0.00050103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> USDT/USDT
                                </td>
                                <td>0.00340103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XLM/USDT
                                </td>
                                <td>0.00035103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ENQ/USDT
                                </td>
                                <td>0.00354103</td>
                                <td className="green">+2.02%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AVA/USDT
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AMB/USDT
                                </td>
                                <td>0.05335103</td>
                                <td className="green">+1.0%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> MAP/USDT
                                </td>
                                <td>0.00234103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GO/USDT
                                </td>
                                <td>0.00354103</td>
                                <td className="red">-6.50%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KICK/USDT
                                </td>
                                <td>0.02053103</td>
                                <td className="red">-6.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> DBC/USDT
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+7.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GGC/USDT
                                </td>
                                <td>0.00353103</td>
                                <td className="red">-4.05%</td>
                            </tr>
                        </tbody>
                    </table>
                </Tab>
                <Tab eventKey="dai" title="DAI">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Pairs</th>
                                <th>Last Price</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ETH/DAI
                                </td>
                                <td>0.05320255</td>
                                <td className="green">+6.58%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KCS/DAI
                                </td>
                                <td>0.00013192</td>
                                <td className="green">+0.6%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XRP/DAI
                                </td>
                                <td>0.00002996</td>
                                <td className="red">-0.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> VET/DAI
                                </td>
                                <td>0.00000103</td>
                                <td className="green">+1.8%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> EOS/DAI
                                </td>
                                <td>0.00000103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BTT/DAI
                                </td>
                                <td>0.00002303</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> LTC/DAI
                                </td>
                                <td>0.03520103</td>
                                <td className="green">+1.5%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRX/DAI
                                </td>
                                <td>0.00330103</td>
                                <td className="red">-3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BSV/DAI
                                </td>
                                <td>0.00300103</td>
                                <td className="green">+2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> COTI/DAI
                                </td>
                                <td>0.003500103</td>
                                <td className="green">+2.85%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XYT/DAI
                                </td>
                                <td>0.00003103</td>
                                <td className="green">+3.55%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> BNB/DAI
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XMR/DAI
                                </td>
                                <td>0.003500103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> TRY/DAI
                                </td>
                                <td>0.00000123</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ADA/DAI
                                </td>
                                <td>0.00050103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> DAI/DAI
                                </td>
                                <td>0.00340103</td>
                                <td className="red">-1.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> XLM/DAI
                                </td>
                                <td>0.00035103</td>
                                <td className="green">+5.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> ENQ/DAI
                                </td>
                                <td>0.00354103</td>
                                <td className="green">+2.02%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AVA/DAI
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+3.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> AMB/DAI
                                </td>
                                <td>0.05335103</td>
                                <td className="green">+1.0%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> MAP/DAI
                                </td>
                                <td>0.00234103</td>
                                <td className="red">-2.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GO/DAI
                                </td>
                                <td>0.00354103</td>
                                <td className="red">-6.50%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> KICK/DAI
                                </td>
                                <td>0.02053103</td>
                                <td className="red">-6.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> DBC/DAI
                                </td>
                                <td>0.02535103</td>
                                <td className="green">+7.05%</td>
                            </tr>
                            <tr>
                                <td>
                                    <i className="icon ion-md-star" /> GGC/DAI
                                </td>
                                <td>0.00353103</td>
                                <td className="red">-4.05%</td>
                            </tr>
                        </tbody>
                    </table>
                </Tab>
            </Tabs>
        </div>
    )
}
