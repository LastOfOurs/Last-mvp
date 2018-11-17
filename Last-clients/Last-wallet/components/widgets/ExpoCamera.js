import React from 'react'
import { Text, View, StyleSheet, Vibration } from 'react-native'
import { Permissions, BarCodeScanner } from 'expo'
import { colors } from '../../common/styles'

export default class QRScanner extends React.Component {
  state = {
    barcodeScanning: true,
    permissionsGranted: false,
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ permissionsGranted: status === 'granted' })
  }

  onBarCodeScanned = ({ type, data }) => {
    this.setState(
      { barcodeScanning: !this.state.barcodeScanning },
    )
    if (type === BarCodeScanner.Constants.BarCodeType.qr) {
      Vibration.vibrate();
      this.props.onBarCodeScanned(data)
    }
  }

  renderNoPermissions = () => 
    <View style={styles.noPermissions}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>

  renderCamera = () =>
    (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.camera}
          onMountError={this.handleMountError}
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.qr,
              BarCodeScanner.Constants.BarCodeType.pdf417,
            ],
          }}
          onBarCodeScanned={this.state.barcodeScanning ? this.onBarCodeScanned : undefined}
          >
        </BarCodeScanner>
      </View>
    )

    render() {
      const cameraScreenContent = this.state.permissionsGranted
        ? this.renderCamera()
        : this.renderNoPermissions()
      const content = cameraScreenContent
      return <View style={styles.container}>{content}</View>
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    camera: {
      flex: 1,
      justifyContent: 'space-between',
    },
  })