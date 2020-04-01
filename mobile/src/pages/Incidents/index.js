import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [totalIncidents, setTotalIncidents] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if(loading) {
            return;
        }
        if(totalIncidents > 0 && incidents.length === totalIncidents) {
            return;
        }

        setLoading(true);
        
        const response = await api.get('incidents', {
            params: { page: page }

        });


        setIncidents([...incidents, ...response.data]);

        

        setTotalIncidents(response.headers['x-total-count']);
        setLoading(false);
        setPage(page + 1);
        
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    
    async function handleRefresh() {
        setRefreshing(true)

        const allDevs = await api.get('incidents', {
            params: {
                page: 'all'
            }
        })
        setIncidents(allDevs.data)
        console.log(allDevs.data)


        setRefreshing(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {totalIncidents} casos. </Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia. </Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                keyExtractor={incident => String(incident.id)}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            

                renderItem={({ item: incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}> ONG: </Text>
                    <Text style={styles.incidentValue}> {incident.name} </Text>

                    <Text style={styles.incidentProperty}> CASO: </Text>
                    <Text style={styles.incidentValue}> {incident.title} </Text>

                    <Text style={styles.incidentProperty}> VALOR: </Text>
                    <Text style={styles.incidentValue}> 
                        {Intl.NumberFormat('pt-BR',  { 
                            style: 'currency',
                            currency: 'BRL'
                            }).format(incident.value)} 
                    </Text>

                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
                )}
            />

           
                

                
        </View>
    )
}