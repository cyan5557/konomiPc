<template>
    <div>
        <headNav></headNav>
        <div class="w1000">
            <div class="bg-white">
                <div class="tit tit-line" style="margin-bottom:50px;">
                    <div class="left"></div>
                    <span class="bold f30">About Konomi</span>
                    <div class="right"></div>
                </div>
                <div class="f18" style="text-indent:30px">
                   Konomi is a full suite asset management solution for cross-chain crypto assets. 
                Using Substrate as the development framework, the network aims to support more assets in the Polkadot ecosystem. 
                Users could manage their crypto holding positions, trade assets and earn interest through decentralised money market products. 
                Konomi also issues its native network token in order to kick start liquidity and decentralised governance. 
                </div>
                <div class="tit tit-line" style="margin-bottom:50px;">
                    <div class="left"></div>
                    <span class="bold f30">Our vision</span>
                    <div class="right"></div>
                </div>
                <div class="f14" style="text-indent:30px">
                    The vision of Konomi at the beginning of its establishment was to enable financial applications to seamlessly connect to the Polkadot ecosystem, 
                and to provide the users with a complete asset management experience - from liquidity agreements, to the lending market, 
                to the management of ecosystem assets. Polkadots has more application scenarios which are different from Ethereum in terms of governance and 
                parachain auctions due to its better performance. As a result, we believe that Polkadot-based financial applications will also have better 
                playability than Ethereum. 
                </div>
                <div class="tit tit-line" style="margin-bottom:50px;">
                    <div class="left"></div>
                    <span class="bold f30">Our mission</span>
                    <div class="right"></div>
                </div>
                <div class="f14" style="text-indent:30px">
                    Konomi is serving crypto users that are looking into investing, 
                trading and managing assets in an efficient way. It is currently deployed as an independent blockchain using the Substrate framework. 
                At launch, it will support functions in trading, deposits and lending. As the Polkadot parachains are launched and that interchain 
                communication protocols are live, Konomi could support more financial products specific to the Polkadot ecosystem.
                </div>
            </div>
            <div style="height:150px;"></div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
import headNav from '../components/head'
import foot from '../components/foot'
export default {
  components:{
    foot,headNav
  },
  data () {
    return {
     
    }
  },
  computed: {
    
  }
}
</script>